export interface EmployeeListProps {
  id: number;
  email: string;
  description: string;
  full_name: string;
  contact_1: string;
  contact_2: string;
  address: string;
  join_date: string;
  dob: string | null;
  gender: string;
  user_type: string;
  status: string;
  account_status: string;
  email_verified_at: string | null;
}
export interface EmployeeDetailProps{
  
  id:number
  email: string; // User's email address
  description: string; // A brief description
  full_name: string; // Full name of the user
  contact_1: string; // Primary contact number
  contact_2?: string | null; // Secondary contact number (optional)
  address: string; // User's address
  join_date: string; // Date the user joined (in YYYY-MM-DD format)
  dob?: string | null; // Date of birth (optional, can be null)
  gender: "male" | "female" | "other"; // Gender of the user
  user_type: "Employee" | "Admin" | "Customer"; // Type of user
  status: "active" | "inactive"; // User's status
  account_status: "pending" | "approved" | "rejected"; // Status of the user's account
  email_verified_at?: string | null; // Timestamp when email was verified (optional, can be null)
  last_login?: string | null; // Timestamp of the last login (optional, can be null)
  state?: string | null; // State (optional, can be null)
  created_at: string; // Timestamp when the user record was created
  updated_at: string; // Timestamp when the user record was last updated


}