export type ClientStatus = "Active" | "Inactive" | "Potential";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: ClientStatus;
  projects: number;
  totalValue: number;
  projectType?: string;
  budgetRange?: string;
  leadSource?: string;
  notes?: string;
  joinDate?: string;
  activities?: { id: string; type: string; message: string; date: string }[];
}
