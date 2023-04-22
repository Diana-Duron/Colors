import express, { Request, Response } from 'express';

import { ColorType } from '../services/ColorServices'; // importar la interfaz ColorType definida en el ejemplo anterior
import ColorData from '../services/data/colores.json'; // importar el archivo JSON con los colores

const app = express();
const PORT = 3001;

let colors: ColorType[] = []; // arreglo que contendrá los objetos de color

// Endpoint GET para obtener todos los colores
app.get('services/data/colores.json', (req: Request, res: Response) => {
  res.json(colors);
});

// Endpoint POST para agregar un nuevo color
app.post('services/data/colores.json', (req: Request, res: Response) => {
  const { descripcion } = req.body; // obtener la descripción del nuevo color del cuerpo de la solicitud
  if (!descripcion) {
    res.status(400).json({ error: 'Falta la descripción del color' }); // si falta la descripción, enviar una respuesta con el error correspondiente
    return;
  }
  const nuevoColor: ColorType = { id: colors.length + 1, descripcion }; // crear el nuevo objeto de color con un ID único
  colors.push(nuevoColor); // agregar el nuevo objeto de color al arreglo
  res.status(201).json(nuevoColor); // enviar una respuesta con el nuevo objeto de color creado
});

// Endpoint DELETE para eliminar un color por ID
app.delete('services/data/colores.json:id', (req: Request, res: Response) => {
  const { id } = req.params; // obtener el ID del color de los parámetros de la URL
  const index = colors.findIndex(color => color.id === Number(id)); // encontrar el índice del objeto de color con el ID especificado
  if (index === -1) {
    res.status(404).json({ error: 'Color no encontrado' }); // si el color no se encuentra, enviar una respuesta con el error correspondiente
    return;
  }
  colors.splice(index, 1); // eliminar el objeto de color del arreglo
  res.status(204).send(); // enviar una respuesta con código de estado 204 (No Content)
});

// Endpoint PUT para actualizar un color por ID

app.put('services/data/colores.json:id', (req: Request, res: Response) => {
  const { id } = req.params; // obtener el ID del color de los parámetros de la URL
  const { descripcion } = req.body; // obtener la descripción del color del cuerpo de la solicitud
  if (!descripcion) {
    res.status(400).json({ error: 'Falta la descripción del color' }); // si falta la descripción, enviar una respuesta con el error correspondiente
    return;
  }
  const index = colors.findIndex(color => color.id === Number(id)); // encontrar el índice del objeto de color con el ID especificado
  colors[index].descripcion = descripcion; // actualizar el objeto de color con el ID especificado
  res.status(204).send(); // enviar una respuesta con código de estado 204 (No Content)
  return;
});
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
