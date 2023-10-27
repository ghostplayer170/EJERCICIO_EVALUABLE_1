import { Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/Personaje.ts";

const getPersonaje = async (res: Response) => {
  try {
    const Personajes = await PersonajeModel.find({}).exec();
    if (!Personajes || Personajes.length === 0) {
      res.status(404).send("Personajes not found");
      return;
    }
    res.status(200).send({
        Personajes
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPersonaje;