import { supabase } from "@/integrations/supabase/client";

// Types matching Supabase schema
export interface DbSecondaryMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth?: string;
  status: "vivant" | "décédé";
}

export interface DbMember {
  id: string;
  member_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_secondary?: string;
  whatsapp?: string;
  campement: string;
  sous_prefecture: string;
  id_type: string;
  id_number?: string;
  photo?: string;
  registration_date: string;
  status: "actif" | "suspendu" | "décédé";
  adhesion_paid: boolean;
  secondary_members: DbSecondaryMember[];
  total_covered_persons: number;
  contribution_status: "à_jour" | "en_retard";
  created_at?: string;
  updated_at?: string;
}

export interface DbDeath {
  id: string;
  deceased_name: string;
  deceased_member_id: string;
  date_of_death: string;
  type: "principal" | "secondaire";
  payout: number;
  retained: number;
  total_expected_contributions: number;
  total_collected: number;
  status: "en_cours" | "clôturé";
  created_at?: string;
}

export interface DbContribution {
  id: string;
  member_id: string;
  member_name: string;
  death_id: string;
  amount: number;
  expected_amount: number;
  payment_method: "especes" | "wave" | "orange" | "mtn" | "moov";
  status: "payé" | "non_payé" | "partiel" | "exonéré";
  date?: string;
  proof_type?: string;
  proof_data?: string;
  created_at?: string;
}

export interface DbTreasury {
  id: string;
  total_balance: number;
  total_contributions_collected: number;
  total_payouts: number;
  retained_reserves: number;
  pending_contributions: number;
  updated_at?: string;
}

export interface DbUser {
  id: string;
  username: string;
  password_hash: string;
  role: "super_admin" | "admin" | "lecture_seule" | "cotisations" | "membres" | "imprimeur";
  display_name: string;
  is_active: boolean;
  created_at?: string;
}

export interface DbSettings {
  id: string;
  association_name: string;
  initials: string;
  phone: string;
  contribution_amount: number;
  adhesion_fee: number;
  principal_payout: number;
  secondary_payout: number;
  secondary_retained: number;
}

// Generate next member ID: MSCB-YY-NNN (uses settings initials)
export async function generateMemberId(): Promise<string> {
  const { data: settings } = await supabase.from("settings").select("initials").limit(1).single();
  const initials = settings?.initials || "MSCB";
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = `${initials}-${year}-`;
  
  const { data: members } = await supabase
    .from("members")
    .select("member_id")
    .like("member_id", `${prefix}%`);
  
  const maxNum = (members || []).reduce((max, m) => {
    const parts = m.member_id.split("-");
    const num = parseInt(parts[parts.length - 1], 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);
  
  const nextNum = String(maxNum + 1).padStart(3, "0");
  return `${prefix}${nextNum}`;
}

// Export all data as JSON
export async function exportAllData(): Promise<string> {
  const [members, deaths, contributions, treasury, users, settings] = await Promise.all([
    supabase.from("members").select("*"),
    supabase.from("deaths").select("*"),
    supabase.from("contributions").select("*"),
    supabase.from("treasury").select("*"),
    supabase.from("app_users").select("id, username, role, display_name, is_active, created_at"),
    supabase.from("settings").select("*"),
  ]);
  
  const data = {
    members: members.data || [],
    deaths: deaths.data || [],
    contributions: contributions.data || [],
    treasury: treasury.data || [],
    users: users.data || [],
    settings: settings.data || [],
    exportDate: new Date().toISOString(),
    version: 3,
  };
  return JSON.stringify(data, null, 2);
}

// Import data from JSON
export async function importAllData(jsonString: string): Promise<{ success: boolean; message: string }> {
  try {
    const data = JSON.parse(jsonString);
    
    // Clear existing data
    await supabase.from("contributions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("deaths").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("members").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    
    // Insert new data
    if (data.members?.length) await supabase.from("members").insert(data.members.map((m: any) => { delete m.id; return m; }));
    if (data.deaths?.length) await supabase.from("deaths").insert(data.deaths.map((d: any) => { delete d.id; return d; }));
    if (data.contributions?.length) await supabase.from("contributions").insert(data.contributions.map((c: any) => { delete c.id; return c; }));
    
    // Update treasury
    if (data.treasury?.[0]) {
      const { data: existing } = await supabase.from("treasury").select("id").limit(1).single();
      if (existing) {
        const { id: _id, ...rest } = data.treasury[0];
        await supabase.from("treasury").update(rest).eq("id", existing.id);
      }
    }
    
    return { success: true, message: `Import réussi : ${data.members?.length || 0} membres, ${data.deaths?.length || 0} décès, ${data.contributions?.length || 0} cotisations` };
  } catch (err: any) {
    return { success: false, message: `Erreur d'import : ${err.message}` };
  }
}
