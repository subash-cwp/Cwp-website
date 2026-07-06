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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ab_test_results: {
        Row: {
          converted: boolean | null
          created_at: string
          id: string
          test_id: string | null
          variant: string
          visitor_id: string
        }
        Insert: {
          converted?: boolean | null
          created_at?: string
          id?: string
          test_id?: string | null
          variant: string
          visitor_id: string
        }
        Update: {
          converted?: boolean | null
          created_at?: string
          id?: string
          test_id?: string | null
          variant?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_results_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_tests: {
        Row: {
          created_at: string
          description: string | null
          ended_at: string | null
          id: string
          name: string
          started_at: string | null
          status: string
          traffic_split: number | null
          variant_a: Json
          variant_b: Json
          winner: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          name: string
          started_at?: string | null
          status?: string
          traffic_split?: number | null
          variant_a: Json
          variant_b: Json
          winner?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          name?: string
          started_at?: string | null
          status?: string
          traffic_split?: number | null
          variant_a?: Json
          variant_b?: Json
          winner?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          category: string | null
          content: string | null
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          published: boolean | null
          read_time: string | null
          scheduled_publish_at: string | null
          seo_score: number | null
          seo_suggestions: Json | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_avatar?: string | null
          author_name?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          published?: boolean | null
          read_time?: string | null
          scheduled_publish_at?: string | null
          seo_score?: number | null
          seo_suggestions?: Json | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          published?: boolean | null
          read_time?: string | null
          scheduled_publish_at?: string | null
          seo_score?: number | null
          seo_suggestions?: Json | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge: string | null
          client: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          industry: string | null
          metrics: Json | null
          published: boolean | null
          results: string | null
          scheduled_publish_at: string | null
          slug: string
          solution: string | null
          technologies: string[] | null
          testimonial: string | null
          testimonial_author: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          challenge?: string | null
          client?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          industry?: string | null
          metrics?: Json | null
          published?: boolean | null
          results?: string | null
          scheduled_publish_at?: string | null
          slug: string
          solution?: string | null
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          challenge?: string | null
          client?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          industry?: string | null
          metrics?: Json | null
          published?: boolean | null
          results?: string | null
          scheduled_publish_at?: string | null
          slug?: string
          solution?: string | null
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          read: boolean | null
          score: number | null
          score_factors: Json | null
          source: string | null
          status: string | null
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          read?: boolean | null
          score?: number | null
          score_factors?: Json | null
          source?: string | null
          status?: string | null
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          read?: boolean | null
          score?: number | null
          score_factors?: Json | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      custom_page_sections: {
        Row: {
          content: Json
          created_at: string
          id: string
          page_id: string
          sort_order: number
          type: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          page_id: string
          sort_order?: number
          type: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          page_id?: string
          sort_order?: number
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "custom_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_pages: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          meta_description: string | null
          og_image: string | null
          published: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          meta_description?: string | null
          og_image?: string | null
          published?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          meta_description?: string | null
          og_image?: string | null
          published?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          click_count: number | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          open_count: number | null
          scheduled_at: string | null
          segment: string | null
          sent_at: string | null
          sent_count: number | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          click_count?: number | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          open_count?: number | null
          scheduled_at?: string | null
          segment?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          click_count?: number | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          open_count?: number | null
          scheduled_at?: string | null
          segment?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          id: string
          linkedin_url: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          position: string
          resume_url: string | null
          status: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          id?: string
          linkedin_url?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          position: string
          resume_url?: string | null
          status?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          id?: string
          linkedin_url?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          position?: string
          resume_url?: string | null
          status?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          folder: string | null
          id: string
          tags: string[] | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          folder?: string | null
          id?: string
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          folder?: string | null
          id?: string
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          subscribed: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          subscribed?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          subscribed?: boolean | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          page_key: string
          published: boolean
          section_key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          page_key: string
          published?: boolean
          section_key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          page_key?: string
          published?: boolean
          section_key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_content: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          created_by: string | null
          id: string
          published_at: string | null
          scheduled_at: string
          status: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          created_by?: string | null
          id?: string
          published_at?: string | null
          scheduled_at: string
          status?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string
          status?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          price_starting: string | null
          published: boolean | null
          slug: string
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          price_starting?: string | null
          published?: boolean | null
          slug: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          price_starting?: string | null
          published?: boolean | null
          slug?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          id: string
          linkedin: string | null
          name: string
          published: boolean | null
          role: string | null
          sort_order: number | null
          twitter: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin?: string | null
          name: string
          published?: boolean | null
          role?: string | null
          sort_order?: number | null
          twitter?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin?: string | null
          name?: string
          published?: boolean | null
          role?: string | null
          sort_order?: number | null
          twitter?: string | null
        }
        Relationships: []
      }
      testimonial_submissions: {
        Row: {
          approved: boolean | null
          company: string | null
          content: string
          created_at: string
          email: string
          id: string
          name: string
          rating: number | null
          role: string | null
        }
        Insert: {
          approved?: boolean | null
          company?: string | null
          content: string
          created_at?: string
          email: string
          id?: string
          name: string
          rating?: number | null
          role?: string | null
        }
        Update: {
          approved?: boolean | null
          company?: string | null
          content?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          rating?: number | null
          role?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar: string | null
          company: string | null
          content: string
          created_at: string | null
          featured: boolean | null
          id: string
          name: string
          published: boolean | null
          rating: number | null
          role: string | null
        }
        Insert: {
          avatar?: string | null
          company?: string | null
          content: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name: string
          published?: boolean | null
          rating?: number | null
          role?: string | null
        }
        Update: {
          avatar?: string | null
          company?: string | null
          content?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          published?: boolean | null
          rating?: number | null
          role?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_grant_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: undefined
      }
      admin_list_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          email_confirmed_at: string
          id: string
          last_sign_in_at: string
          roles: string[]
        }[]
      }
      admin_revoke_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: undefined
      }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_public_team_members: {
        Args: never
        Returns: {
          avatar: string
          bio: string
          id: string
          linkedin: string
          name: string
          role: string
          sort_order: number
          twitter: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_master_admin: { Args: { _user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "content_manager"
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
      app_role: ["admin", "moderator", "user", "content_manager"],
    },
  },
} as const
