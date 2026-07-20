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
      app_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "app_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_holder: string
          active: boolean
          admin_id: string
          bank_name: string
          clabe: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          account_holder: string
          active?: boolean
          admin_id: string
          bank_name: string
          clabe: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          account_holder?: string
          active?: boolean
          admin_id?: string
          bank_name?: string
          clabe?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_attachments: {
        Row: {
          category: Database["public"]["Enums"]["attachment_category"]
          created_at: string
          file_name: string
          file_path: string
          file_type: string
          flight_id: string
          id: string
          uploaded_by: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["attachment_category"]
          created_at?: string
          file_name: string
          file_path: string
          file_type: string
          flight_id: string
          id?: string
          uploaded_by: string
        }
        Update: {
          category?: Database["public"]["Enums"]["attachment_category"]
          created_at?: string
          file_name?: string
          file_path?: string
          file_type?: string
          flight_id?: string
          id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_attachments_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_attachments_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_internal_notes: {
        Row: {
          admin_id: string
          created_at: string
          flight_id: string
          id: string
          note: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          flight_id: string
          id?: string
          note: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          flight_id?: string
          id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_internal_notes_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_internal_notes_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_messages: {
        Row: {
          created_at: string
          flight_id: string
          id: string
          message: string
          message_type: string
          receiver_id: string | null
          sender_id: string
        }
        Insert: {
          created_at?: string
          flight_id: string
          id?: string
          message: string
          message_type?: string
          receiver_id?: string | null
          sender_id: string
        }
        Update: {
          created_at?: string
          flight_id?: string
          id?: string
          message?: string
          message_type?: string
          receiver_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_messages_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          admin_commission_amount: number
          admin_notes: string | null
          amount_to_pay: number
          cancelled_at: string | null
          cancelled_by: string | null
          created_at: string
          extras: Json
          fare_type: string
          financial_notes: string | null
          financial_status: string
          financial_updated_at: string | null
          financial_updated_by: string | null
          flight_date: string
          flight_folio: string | null
          flight_image_path: string | null
          flight_time: string
          flight_type: string
          id: string
          passengers: Json
          payment_percentage: number
          profit_amount: number
          provider_cost_amount: number
          return_flight_date: string | null
          return_flight_time: string | null
          status: Database["public"]["Enums"]["flight_status"]
          total_amount: number
          updated_at: string
          user_cancel_reason: string | null
          user_id: string
        }
        Insert: {
          admin_commission_amount?: number
          admin_notes?: string | null
          amount_to_pay?: number
          cancelled_at?: string | null
          cancelled_by?: string | null
          created_at?: string
          extras?: Json
          fare_type: string
          financial_notes?: string | null
          financial_status?: string
          financial_updated_at?: string | null
          financial_updated_by?: string | null
          flight_date: string
          flight_folio?: string | null
          flight_image_path?: string | null
          flight_time: string
          flight_type?: string
          id?: string
          passengers?: Json
          payment_percentage?: number
          profit_amount?: number
          provider_cost_amount?: number
          return_flight_date?: string | null
          return_flight_time?: string | null
          status?: Database["public"]["Enums"]["flight_status"]
          total_amount?: number
          updated_at?: string
          user_cancel_reason?: string | null
          user_id: string
        }
        Update: {
          admin_commission_amount?: number
          admin_notes?: string | null
          amount_to_pay?: number
          cancelled_at?: string | null
          cancelled_by?: string | null
          created_at?: string
          extras?: Json
          fare_type?: string
          financial_notes?: string | null
          financial_status?: string
          financial_updated_at?: string | null
          financial_updated_by?: string | null
          flight_date?: string
          flight_folio?: string | null
          flight_image_path?: string | null
          flight_time?: string
          flight_type?: string
          id?: string
          passengers?: Json
          payment_percentage?: number
          profit_amount?: number
          provider_cost_amount?: number
          return_flight_date?: string | null
          return_flight_time?: string | null
          status?: Database["public"]["Enums"]["flight_status"]
          total_amount?: number
          updated_at?: string
          user_cancel_reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flights_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          flight_id: string | null
          id: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          flight_id?: string | null
          id?: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          flight_id?: string | null
          id?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_flight: { Args: { check_flight_id: string }; Returns: boolean }
      is_admin: { Args: { check_user_id?: string }; Returns: boolean }
    }
    Enums: {
      app_role: "user" | "admin"
      attachment_category: "vuelo" | "comprobante_pago" | "qr" | "otro"
      flight_status:
        | "pendiente_revision"
        | "esperando_pago"
        | "pago_subido"
        | "pago_confirmado"
        | "pendiente_qr"
        | "qr_enviado"
        | "completado"
        | "cancelado"
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
    Enums: {
      app_role: ["user", "admin"],
      attachment_category: ["vuelo", "comprobante_pago", "qr", "otro"],
      flight_status: [
        "pendiente_revision",
        "esperando_pago",
        "pago_subido",
        "pago_confirmado",
        "pendiente_qr",
        "qr_enviado",
        "completado",
        "cancelado",
      ],
    },
  },
} as const
