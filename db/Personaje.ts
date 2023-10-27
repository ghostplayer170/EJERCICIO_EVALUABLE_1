import mongoose from "npm:mongoose@7.6.3";
import { Personaje } from "../types.ts";

const Schema = mongoose.Schema;

const PersonajeSchema = new Schema(
  {
    name: { type: String, required: true },
    raza: { type: String, required: true },
    descripcion: { type: String, required: true },
    habilidades: { type: [], required: true },
  },
  { timestamps: true }
);

export type PersonajeModelType = mongoose.Document & Omit<Personaje, "id">;

export default mongoose.model<PersonajeModelType>("Personaje", PersonajeSchema);