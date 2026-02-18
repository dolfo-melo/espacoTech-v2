import { useState } from 'react';
import { supabase } from '../../lib/supabase'; 
import { TIME_SLOTS } from '../../types/timeSlots';
import { 
  Button, MenuItem, Select, FormControl, InputLabel, TextField, Alert 
} from '@mui/material';

export default function BookingForm({ roomId, userId }: { roomId: number, userId: string }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [slotId, setSlotId] = useState(''); // Guarda 'M1', 'T1', etc.
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleReserve = async () => {
    setLoading(true);
    setMsg({ type: '', text: '' });

    // 1. Encontra o objeto do horário baseado na seleção
    const slot = TIME_SLOTS.find(s => s.id === slotId);

    if (!slot || !selectedDate) {
      setMsg({ type: 'error', text: 'Selecione data e horário.' });
      setLoading(false);
      return;
    }

    // 2. Envia para o Supabase os horários REAIS (start/end)
    // A validação de conflito (&&) do Postgres funcionará perfeitamente aqui.
    const { error } = await supabase
      .from('bookings')
      .insert({
        room_id: roomId,
        user_id: userId,
        date: selectedDate,
        start_time: slot.start, // Envia '08:00:00'
        end_time: slot.end      // Envia '09:30:00'
      });

    if (error) {
      if (error.code === '23P01') {
         setMsg({ type: 'error', text: 'Horário indisponível! Já existe reserva.' });
      } else {
         setMsg({ type: 'error', text: 'Erro ao reservar.' });
      }
    } else {
      setMsg({ type: 'success', text: 'Reserva confirmada!' });
      setSlotId(''); // Limpa seleção
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {msg.text && <Alert severity={msg.type as any}>{msg.text}</Alert>}

      {/* Seletor de Data */}
      <TextField
        type="date"
        label="Data"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        fullWidth
      />

      {/* Seletor de Horários Pré-definidos (ENUM Visual) */}
      <FormControl fullWidth>
        <InputLabel>Horário</InputLabel>
        <Select
          value={slotId}
          label="Horário"
          onChange={(e) => setSlotId(e.target.value)}
        >
          {TIME_SLOTS.map((slot) => (
            <MenuItem key={slot.id} value={slot.id}>
              {slot.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleReserve}
        disabled={loading}
      >
        {loading ? 'Reservando...' : 'Confirmar Reserva'}
      </Button>
    </div>
  );
}