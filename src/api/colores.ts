import express, { Request, Response } from 'express';

import { ColorType } from '../services/ColorServices'; 
import ColorData from '../services/data/colores.json'; 

const app = express();
const PORT = 3001;

let colors: ColorType[] = []; 

// Endpoint GET para obtener todos los colores
app.get('services/data/colores.json', (req: Request, res: Response) => {
  res.json(colors);
});

// Endpoint POST para agregar un nuevo color
app.post('services/data/colores.json', (req: Request, res: Response) => {
  const { descripcion } = req.body; 
  if (!descripcion) {
    res.status(400).json({ error: 'Falta la descripción del color' }); 
    return;
  }
  const nuevoColor: ColorType = { id: colors.length + 1, descripcion }; 
  colors.push(nuevoColor);
  res.status(201).json(nuevoColor); 
});

// Endpoint DELETE para eliminar un color por ID
app.delete('services/data/colores.json:id', (req: Request, res: Response) => {
  const { id } = req.params; // obtener el ID del color de los parámetros de la URL
  const index = colors.findIndex(color => color.id === Number(id)); 
  if (index === -1) {
    res.status(404).json({ error: 'Color no encontrado' }); 
    return;
  }
  colors.splice(index, 1); 
  res.status(204).send(); 
});

// Endpoint PUT para actualizar un color por ID

app.put('services/data/colores.json:id', (req: Request, res: Response) => {
  const { id } = req.params; // obtener el ID del color de los parámetros de la URL
  const { descripcion } = req.body; 
  if (!descripcion) {
    res.status(400).json({ error: 'Falta la descripción del color' }); 
    return;
  }
  const index = colors.findIndex(color => color.id === Number(id)); 
  colors[index].descripcion = descripcion; 
  res.status(204).send(); // enviar una respuesta con código de estado 204 (No Content)
  return;
});
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
