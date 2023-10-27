import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/Personaje.ts";

const modifyPersonaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {  name, raza, descripcion, habilidades  } = req.body;
    if (!name || !raza || !descripcion || !habilidades) {
      res.status(400).send("Name, raza, descripcion, habilidades are required");
      return;
    }

    const razas = ["Hobbits","Humanos","Elfos","Enanos","Ents"]
    const razaExists = razas.find((elem)=>raza===elem)
    if (razaExists===undefined) {
      res.status(500).send("Raza do not exists");
      return;
    }

    const modifydPersonaje = await PersonajeModel.findOneAndUpdate(
      { _id: id },
      { name, raza, descripcion, habilidades },
      { new: true }
    ).exec();

    if (!modifydPersonaje) {
      res.status(404).send("Personaje not found");
      return;
    }

    res.status(200).send({
      name: modifydPersonaje.name,
      raza: modifydPersonaje.raza,
      descripcion: modifydPersonaje.descripcion,
      habilidades: modifydPersonaje.habilidades,
      id: modifydPersonaje._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default modifyPersonaje;