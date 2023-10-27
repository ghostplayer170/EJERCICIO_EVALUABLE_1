import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/Personaje.ts";

const addPersonaje = async (req: Request, res: Response) => {
  try {
    const { name, raza, descripcion, habilidades } = req.body;
    if (!name || !raza || !descripcion || !habilidades) {
      res.status(500).send("Nombre, raza, descripcion y habilidades are required");
      return;
    }

    const razas = ["Hobbits","Humanos","Elfos","Enanos","Ents"]
    const razaExists = razas.find((elem)=>raza===elem)
    if (razaExists===undefined) {
      res.status(500).send("Raza do not exists");
      return;
    }

    const newPersonaje = new PersonajeModel({ name, raza, descripcion, habilidades });
    await newPersonaje.save();

    res.status(200).send({
      id: newPersonaje._id.String(),
      name: newPersonaje.name,
      raza: newPersonaje.raza,
      descripcion: newPersonaje.descripcion,
      habilidades: newPersonaje.habilidades,
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPersonaje;