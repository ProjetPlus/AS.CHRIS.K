export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_users: {
        Row: {
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          password_hash: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          is_active?: boolean
          password_hash: string
          role?: string
          username: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          is_active?: boolean
          password_hash?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      contributions: {
        Row: {
          amount: number
          created_at: string
          date: string | null
          death_id: string
          expected_amount: number
          id: string
          member_id: string
          member_name: string
          payment_method: string
          proof_data: string | null
          proof_type: string | null
          status: string
        }
        Insert: {
          amount?: number
          created_at?: string
          date?: string | null
          death_id: string
          expected_amount?: number
          id?: string
          member_id: string
          member_name: string
          payment_method?: string
          proof_data?: string | null
          proof_type?: string | null
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string | null
          death_id?: string
          expected_amount?: number
          id?: string
          member_id?: string
          member_name?: string
          payment_method?: string
          proof_data?: string | null
          proof_type?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "contributions_death_id_fkey"
            columns: ["death_id"]
            isOneToOne: false
            referencedRelation: "deaths"
            referencedColumns: ["id"]
          },
        ]
      }
      deaths: {
        Row: {
          created_at: string
          date_of_death: string
          deceased_member_id: string
          deceased_name: string
          id: string
          payout: number
          retained: number
          status: string
          total_collected: number
          total_expected_contributions: number
          type: string
        }
        Insert: {
          created_at?: string
          date_of_death: string
          deceased_member_id: string
          deceased_name: string
          id?: string
          payout?: number
          retained?: number
          status?: string
          total_collected?: number
          total_expected_contributions?: number
          type: string
        }
        Update: {
          created_at?: string
          date_of_death?: string
          deceased_member_id?: string
          deceased_name?: string
          id?: string
          payout?: number
          retained?: number
          status?: string
          total_collected?: number
          total_expected_contributions?: number
          type?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          adhesion_paid: boolean
          campement: string
          contribution_status: string
          created_at: string
          first_name: string
          id: string
          id_number: string | null
          id_type: string
          last_name: string
          member_id: string
          phone: string
          phone_secondary: string | null
          photo: string | null
          registration_date: string
          secondary_members: Json
          sous_prefecture: string
          status: string
          total_covered_persons: number
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          adhesion_paid?: boolean
          campement?: string
          contribution_status?: string
          created_at?: string
          first_name: string
          id?: string
          id_number?: string | null
          id_type?: string
          last_name: string
          member_id: string
          phone: string
          phone_secondary?: string | null
          photo?: string | null
          registration_date?: string
          secondary_members?: Json
          sous_prefecture?: string
          status?: string
          total_covered_persons?: number
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          adhesion_paid?: boolean
          campement?: string
          contribution_status?: string
          created_at?: string
          first_name?: string
          id?: string
          id_number?: string | null
          id_type?: string
          last_name?: string
          member_id?: string
          phone?: string
          phone_secondary?: string | null
          photo?: string | null
          registration_date?: string
          secondary_members?: Json
          sous_prefecture?: string
          status?: string
          total_covered_persons?: number
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          adhesion_fee: number
          association_name: string
          contribution_amount: number
          created_at: string
          id: string
          initials: string
          phone: string
          principal_payout: number
          secondary_payout: number
          secondary_retained: number
          updated_at: string
        }
        Insert: {
          adhesion_fee?: number
          association_name?: string
          contribution_amount?: number
          created_at?: string
          id?: string
          initials?: string
          phone?: string
          principal_payout?: number
          secondary_payout?: number
          secondary_retained?: number
          updated_at?: string
        }
        Update: {
          adhesion_fee?: number
          association_name?: string
          contribution_amount?: number
          created_at?: string
          id?: string
          initials?: string
          phone?: string
          principal_payout?: number
          secondary_payout?: number
          secondary_retained?: number
          updated_at?: string
        }
        Relationships: []
      }
      treasury: {
        Row: {
          id: string
          pending_contributions: number
          retained_reserves: number
          total_balance: number
          total_contributions_collected: number
          total_payouts: number
          updated_at: string
        }
        Insert: {
          id?: string
          pending_contributions?: number
          retained_reserves?: number
          total_balance?: number
          total_contributions_collected?: number
          total_payouts?: number
          updated_at?: string
        }
        Update: {
          id?: string
          pending_contributions?: number
          retained_reserves?: number
          total_balance?: number
          total_contributions_collected?: number
          total_payouts?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_app_user: {
        Args: { p_password: string; p_username: string }
        Returns: {
          created_at: string
          display_name: string
          id: string
          is_active: boolean
          password_hash: string
          role: string
          username: string
        }[]
        SetofOptions: {
          from: "*"
          to: "app_users"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      create_app_user: {
        Args: {
          p_display_name: string
          p_password: string
          p_role: string
          p_username: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
