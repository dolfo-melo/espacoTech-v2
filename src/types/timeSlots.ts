export interface TimeSlot{
    id: string;
    label: string;
    start: string;
    end: string;
}

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'M1', label: 'Manhã 1 (08:00 - 09:30)', start: '08:00:00', end: '09:30:00' },
  { id: 'M2', label: 'Manhã 2 (10:00 - 11:30)', start: '10:00:00', end: '11:30:00' },
  { id: 'T1', label: 'Tarde 1 (14:00 - 15:30)', start: '14:00:00', end: '15:30:00' },
  { id: 'T2', label: 'Tarde 2 (16:00 - 17:30)', start: '16:00:00', end: '17:30:00' },
  { id: 'N1', label: 'Noite 1 (19:00 - 20:30)', start: '19:00:00', end: '20:30:00' },
];