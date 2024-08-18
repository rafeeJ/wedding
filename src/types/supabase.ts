export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      approved_users: {
        Row: {
          allowed_day_invite: boolean;
          allowed_night_invite: boolean;
          allowed_plus_one: boolean;
          email: string;
          first_name: string;
          id: number;
          last_name: string;
          plus_one_allowed_day: boolean;
        };
        Insert: {
          allowed_day_invite?: boolean;
          allowed_night_invite?: boolean;
          allowed_plus_one?: boolean;
          email: string;
          first_name: string;
          id?: number;
          last_name: string;
          plus_one_allowed_day?: boolean;
        };
        Update: {
          allowed_day_invite?: boolean;
          allowed_night_invite?: boolean;
          allowed_plus_one?: boolean;
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          plus_one_allowed_day?: boolean;
        };
        Relationships: [];
      };
      food_options: {
        Row: {
          category: Database["public"]["Enums"]["food_categories"];
          description: string;
          id: number;
          name: string;
        };
        Insert: {
          category: Database["public"]["Enums"]["food_categories"];
          description: string;
          id?: number;
          name: string;
        };
        Update: {
          category?: Database["public"]["Enums"]["food_categories"];
          description?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      plus_one: {
        Row: {
          attending_day: boolean;
          attending_night: boolean;
          chosen_food_option: number[] | null;
          dietary_requirements: string | null;
          first_name: string;
          id: number;
          last_name: string;
          user_id: number;
        };
        Insert: {
          attending_day?: boolean;
          attending_night?: boolean;
          chosen_food_option?: number[] | null;
          dietary_requirements?: string | null;
          first_name: string;
          id?: number;
          last_name: string;
          user_id: number;
        };
        Update: {
          attending_day?: boolean;
          attending_night?: boolean;
          chosen_food_option?: number[] | null;
          dietary_requirements?: string | null;
          first_name?: string;
          id?: number;
          last_name?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "plus_one_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "approved_users";
            referencedColumns: ["id"];
          },
        ];
      };
      rsvp: {
        Row: {
          attending_day: boolean;
          attending_night: boolean;
          chosen_food_option: number[] | null;
          dietary_requirements: string | null;
          id: number;
          plus_oneId: number | null;
          user_id: number;
        };
        Insert: {
          attending_day?: boolean;
          attending_night?: boolean;
          chosen_food_option?: number[] | null;
          dietary_requirements?: string | null;
          id?: number;
          plus_oneId?: number | null;
          user_id: number;
        };
        Update: {
          attending_day?: boolean;
          attending_night?: boolean;
          chosen_food_option?: number[] | null;
          dietary_requirements?: string | null;
          id?: number;
          plus_oneId?: number | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rsvp_plus_oneId_fkey";
            columns: ["plus_oneId"];
            isOneToOne: false;
            referencedRelation: "plus_one";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rsvp_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "approved_users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      food_categories: "STARTER" | "MAIN" | "DESSERT";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
