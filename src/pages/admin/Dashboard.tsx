import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { 
  Button, Table, TableBody, TableCell, TableHead, TableRow, 
  Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions 
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

// Interface TypeScript
interface Room {
  id: number
  name: string
  price: number
  description: string
}

export default function Dashboard() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editRoom, setEditRoom] = useState<Room | null>(null) // Se null, é criação. Se tem objeto, é edição.
  
  // Estado do formulário
  const [formData, setFormData] = useState({ name: '', price: '', description: '' })

  // === 1. LEITURA (READ) ===
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['admin-rooms'],
    queryFn: async () => {
      const { data, error } = await supabase.from('rooms').select('*').order('id')
      if (error) throw error
      return data as Room[]
    }
  })

  // === 2. CRIAÇÃO/EDIÇÃO (UPSERT) ===
  const mutation = useMutation({
    mutationFn: async (newRoom: any) => {
      // Se tiver ID, atualiza. Se não, cria.
      const { error } = await supabase.from('rooms').upsert(newRoom)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rooms'] }) // Atualiza a lista
      handleClose()
    }
  })

  // === 3. DELEÇÃO (DELETE) ===
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('rooms').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rooms'] })
    }
  })

  // === HANDLERS ===
  const handleOpen = (room?: Room) => {
    if (room) {
      setEditRoom(room)
      setFormData({ name: room.name, price: String(room.price), description: room.description || '' })
    } else {
      setEditRoom(null)
      setFormData({ name: '', price: '', description: '' })
    }
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleSave = () => {
    const payload = {
      ...(editRoom?.id && { id: editRoom.id }), // Só manda ID se for edição
      name: formData.name,
      price: Number(formData.price),
      description: formData.description
    }
    mutation.mutate(payload)
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Salas</h1>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
          className="bg-green-600 hover:bg-green-700"
        >
          Nova Sala
        </Button>
      </div>

      {/* Tabela de Listagem */}
      <Paper elevation={2}>
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço/h</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <TableRow><TableCell>Carregando...</TableCell></TableRow> : 
             rooms?.map((room) => (
              <TableRow key={room.id} hover>
                <TableCell>{room.id}</TableCell>
                <TableCell className="font-semibold">{room.name}</TableCell>
                <TableCell>R$ {room.price}</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(room)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(room.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal de Formulário */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editRoom ? 'Editar Sala' : 'Cadastrar Nova Sala'}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField 
            label="Nome da Sala" fullWidth 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <TextField 
            label="Preço por Hora" type="number" fullWidth 
            value={formData.price} 
            onChange={e => setFormData({...formData, price: e.target.value})} 
          />
          <TextField 
            label="Descrição" multiline rows={3} fullWidth 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}