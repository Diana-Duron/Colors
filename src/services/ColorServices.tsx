import axios from "axios";

export interface ColorType {
    id: number;
    descripcion: string;
}

const URI = "http://localhost:3001"


export async function getColors(): Promise<ColorType[]> {
    const response = await axios.get<ColorType[]>(
        `${URI}/api/colores.ts`
    );
    return response.data;
}

export async function addColor(color: string): Promise<ColorType> {
    const response = await axios.post<ColorType>(
        `${URI}/api/colores.ts`
        , { descripcion: color } // body or payload
    );
    return response.data;
}

export async function deleteColor(id: number): Promise<void> {
    await axios.delete<void>(
        `${URI}/api/colores/${id}`
    );
}

export async function updateColor(color: string): Promise<void> {
    await axios.put<void>(
        `${URI}/api/colores/${color}`
    );
}