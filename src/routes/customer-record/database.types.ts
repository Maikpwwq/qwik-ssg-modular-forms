export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customer_form: {
        Row: {
          created_at: string
          email: string | null
          id: number
          issue: string | null
          message: string | null
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          issue?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          issue?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}