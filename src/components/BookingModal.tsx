import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, List, ListItem, ListItemText, CircularProgress, Typography, Paper
} from '@mui/material';

interface Props {
  open: boolean
  onClose: () => void
  userId: string
}

export default function BookingModal({ open, onClose, userId }: Props) {
  // Busca as reservas usando TanStack Query
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['my-bookings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, date, start_time, end_time,
          rooms (name)
        `)
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (error) throw error;
      return data;
    },
    enabled: !!userId && open
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">Minhas Reservas</DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <div className="flex justify-center p-4"><CircularProgress /></div>
        ) : bookings?.length === 0 ? (
          <Typography color="text.secondary" align="center">
            Você ainda não possui nenhuma reserva cadastrada.
          </Typography>
        ) : (
          <List>
            {bookings?.map((booking: any) => (
              <Paper key={booking.id} elevation={1} sx={{ mb: 2, p: 2 }}>
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="primary">
                        {booking.rooms?.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        <strong>Data:</strong> {booking.date} <br />
                        <strong>Horário:</strong> {booking.start_time} às {booking.end_time}
                      </Typography>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}