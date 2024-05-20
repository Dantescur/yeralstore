export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          categoryid: number
          categoryname: string
        }
        Insert: {
          categoryid?: number
          categoryname: string
        }
        Update: {
          categoryid?: number
          categoryname?: string
        }
        Relationships: []
      }
      customer: {
        Row: {
          customerid: number
          email: string
          firstname: string
          lastname: string
          phonenumber: string | null
          user_id: string | null
        }
        Insert: {
          customerid?: number
          email: string
          firstname: string
          lastname: string
          phonenumber?: string | null
          user_id?: string | null
        }
        Update: {
          customerid?: number
          email?: string
          firstname?: string
          lastname?: string
          phonenumber?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      Order: {
        Row: {
          customerid: number | null
          orderdate: string
          orderid: number
        }
        Insert: {
          customerid?: number | null
          orderdate: string
          orderid?: number
        }
        Update: {
          customerid?: number | null
          orderdate?: string
          orderid?: number
        }
        Relationships: [
          {
            foreignKeyName: "Order_customerid_fkey"
            columns: ["customerid"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["customerid"]
          },
        ]
      }
      order_product: {
        Row: {
          orderid: number
          productid: number
          quantity: number
          unitprice: number
        }
        Insert: {
          orderid: number
          productid: number
          quantity: number
          unitprice: number
        }
        Update: {
          orderid?: number
          productid?: number
          quantity?: number
          unitprice?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_product_orderid_fkey"
            columns: ["orderid"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["orderid"]
          },
          {
            foreignKeyName: "order_product_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["productid"]
          },
        ]
      }
      product: {
        Row: {
          categoryid: number | null
          picture: string | null
          price: number
          productid: number
          productname: string
        }
        Insert: {
          categoryid?: number | null
          picture?: string | null
          price: number
          productid?: number
          productname: string
        }
        Update: {
          categoryid?: number | null
          picture?: string | null
          price?: number
          productid?: number
          productname?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["categoryid"]
          },
        ]
      }
      product_supplier: {
        Row: {
          productid: number
          supplierid: number
        }
        Insert: {
          productid: number
          supplierid: number
        }
        Update: {
          productid?: number
          supplierid?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_supplier_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["productid"]
          },
          {
            foreignKeyName: "product_supplier_supplierid_fkey"
            columns: ["supplierid"]
            isOneToOne: false
            referencedRelation: "supplier"
            referencedColumns: ["supplierid"]
          },
        ]
      }
      supplier: {
        Row: {
          contactemail: string | null
          contactname: string | null
          phonenumber: string | null
          supplierid: number
          suppliername: string
        }
        Insert: {
          contactemail?: string | null
          contactname?: string | null
          phonenumber?: string | null
          supplierid?: number
          suppliername: string
        }
        Update: {
          contactemail?: string | null
          contactname?: string | null
          phonenumber?: string | null
          supplierid?: number
          suppliername?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never
