export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Ticket {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}