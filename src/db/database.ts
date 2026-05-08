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

// Generate next member ID: <INITIALS>-YY-NNN (uses settings initials, defaults to A)
export async function generateMemberId(): Promise<string> {
  const { data: settings } = await supabase.from("settings").select("initials").limit(1).single();
  const initials = settings?.initials || "A";
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

// Schema validators for safe import
import { z } from "zod";

const memberSchema = z.object({
  member_id: z.string().trim().min(1).max(64),
  first_name: z.string().trim().min(1).max(120),
  last_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(40),
  phone_secondary: z.string().trim().max(40).nullish(),
  whatsapp: z.string().trim().max(40).nullish(),
  campement: z.string().max(120).default(""),
  sous_prefecture: z.string().max(120).default(""),
  id_type: z.string().max(40).default(""),
  id_number: z.string().max(80).nullish(),
  photo: z.string().max(8_000_000).nullish(),
  registration_date: z.string().max(40).optional(),
  status: z.enum(["actif", "suspendu", "décédé"]).default("actif"),
  adhesion_paid: z.boolean().default(false),
  secondary_members: z.array(z.any()).default([]),
  total_covered_persons: z.number().int().min(0).max(50).default(1),
  contribution_status: z.enum(["à_jour", "en_retard"]).default("à_jour"),
}).passthrough();

const deathSchema = z.object({
  deceased_name: z.string().trim().min(1).max(240),
  deceased_member_id: z.string().trim().min(1).max(64),
  date_of_death: z.string().max(40),
  type: z.enum(["principal", "secondaire"]),
  payout: z.number().int().min(0).max(1_000_000_000).default(0),
  retained: z.number().int().min(0).max(1_000_000_000).default(0),
  total_expected_contributions: z.number().int().min(0).default(0),
  total_collected: z.number().int().min(0).default(0),
  status: z.enum(["en_cours", "clôturé"]).default("en_cours"),
}).passthrough();

const contributionSchema = z.object({
  member_id: z.string().trim().min(1).max(64),
  member_name: z.string().trim().min(1).max(240),
  death_id: z.string().uuid(),
  amount: z.number().int().min(0).max(1_000_000_000).default(0),
  expected_amount: z.number().int().min(0).max(1_000_000_000).default(0),
  payment_method: z.enum(["especes", "wave", "orange", "mtn", "moov"]).default("especes"),
  status: z.enum(["payé", "non_payé", "partiel", "exonéré"]).default("non_payé"),
  date: z.string().max(40).nullish(),
  proof_type: z.string().max(40).nullish(),
  proof_data: z.string().max(8_000_000).nullish(),
}).passthrough();

const treasurySchema = z.object({
  total_balance: z.number().int().default(0),
  total_contributions_collected: z.number().int().min(0).default(0),
  total_payouts: z.number().int().min(0).default(0),
  retained_reserves: z.number().int().min(0).default(0),
  pending_contributions: z.number().int().min(0).default(0),
}).passthrough();

function stripId<T extends Record<string, any>>(o: T) { const { id, ...rest } = o; return rest; }

export async function importAllData(jsonString: string): Promise<{ success: boolean; message: string }> {
  try {
    const data = JSON.parse(jsonString);

    // Validate every record BEFORE touching the database
    const validMembers = z.array(memberSchema).parse(data.members ?? []).map(stripId);
    const validDeaths = z.array(deathSchema).parse(data.deaths ?? []).map(stripId);
    const validContribs = z.array(contributionSchema).parse(data.contributions ?? []).map(stripId);
    const validTreasury = data.treasury?.[0] ? treasurySchema.parse(data.treasury[0]) : null;

    // Clear existing data
    await supabase.from("contributions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("deaths").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("members").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Insert validated data
    if (validMembers.length) await supabase.from("members").insert(validMembers as any);
    if (validDeaths.length) await supabase.from("deaths").insert(validDeaths as any);
    if (validContribs.length) await supabase.from("contributions").insert(validContribs as any);
    
    // Update treasury
    if (validTreasury) {
      const { data: existing } = await supabase.from("treasury").select("id").limit(1).single();
      if (existing) {
        await supabase.from("treasury").update(validTreasury as any).eq("id", existing.id);
      }
    }

    return { success: true, message: `Import réussi : ${validMembers.length} membres, ${validDeaths.length} décès, ${validContribs.length} cotisations` };
  } catch (err: any) {
    return { success: false, message: `Erreur d'import : ${err.message}` };
  }
}
