export interface TimeSlot {
  start_at: string;
  finish_at: string;
  is_available: boolean;
}

export interface TimeChooserProps {
  service_id: number;
  employee_id: number;
  date: Date;
}
