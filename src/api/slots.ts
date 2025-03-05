import type { TimeSlot } from "../types";
import { format } from "date-fns";

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  {
    start_at: "2025-01-18T07:00:00Z",
    finish_at: "2025-01-18T07:40:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T07:40:00Z",
    finish_at: "2025-01-18T08:20:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T08:20:00Z",
    finish_at: "2025-01-18T09:00:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T09:00:00Z",
    finish_at: "2025-01-18T09:40:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T09:40:00Z",
    finish_at: "2025-01-18T10:20:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T10:20:00Z",
    finish_at: "2025-01-18T11:00:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T11:00:00Z",
    finish_at: "2025-01-18T11:40:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T11:40:00Z",
    finish_at: "2025-01-18T12:20:00Z",
    is_available: false,
  },
  {
    start_at: "2025-01-18T12:20:00Z",
    finish_at: "2025-01-18T13:00:00Z",
    is_available: false,
  },
  {
    start_at: "2025-01-18T13:00:00Z",
    finish_at: "2025-01-18T13:40:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T13:40:00Z",
    finish_at: "2025-01-18T14:20:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T14:20:00Z",
    finish_at: "2025-01-18T15:00:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T15:00:00Z",
    finish_at: "2025-01-18T15:40:00Z",
    is_available: false,
  },
  {
    start_at: "2025-01-18T15:40:00Z",
    finish_at: "2025-01-18T16:20:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T16:20:00Z",
    finish_at: "2025-01-18T17:00:00Z",
    is_available: true,
  },
  {
    start_at: "2025-01-18T17:00:00Z",
    finish_at: "2025-01-18T17:40:00Z",
    is_available: false,
  },
  {
    start_at: "2025-01-18T17:40:00Z",
    finish_at: "2025-01-18T18:20:00Z",
    is_available: false,
  },
  {
    start_at: "2025-01-18T18:20:00Z",
    finish_at: "2025-01-18T19:00:00Z",
    is_available: false,
  },
  {
    start_at: "2025-01-18T19:00:00Z",
    finish_at: "2025-01-18T19:40:00Z",
    is_available: true,
  },
];

export async function fetchTimeSlots(
  serviceId?: number,
  employeeId?: number,
  date?: Date,
): Promise<TimeSlot[]> {
  // Заглушка для пути запроса
  const apiUrl = `/api/plug`;

  const params = new URLSearchParams();
  if (serviceId) params.append("service_id", serviceId.toString());
  if (employeeId) params.append("employee_id", employeeId.toString());
  if (date) params.append("date", format(date, "yyyy-MM-dd"));

  const fullUrl = `${apiUrl}?${params.toString()}`;

  console.log(`Запрос к: ${fullUrl}`);

  // В реальном приложении:
  // const response = await fetch(fullUrl);
  // if (!response.ok) {
  //   throw new Error(`HTTP Error: ${response.status}`);
  // }
  // return await response.json() as TimeSlot[];

  // Задержка для имитации запроса и отображения статуса загрузки
  return new Promise<TimeSlot[]>((resolve) => {
    setTimeout(() => {
      resolve(DEFAULT_TIME_SLOTS);
    }, 300);
  });
}
