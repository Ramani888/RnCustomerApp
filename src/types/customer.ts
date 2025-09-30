export interface Customer {
  id?: number;
  companyName: string;
  companyNumber?: string;
  address?: string;
  email?: string;
  phone: string;
  additionalPhone?: string;
  notes?: string;
}

export interface Folder {
  name: string;
  description?: string;
}
