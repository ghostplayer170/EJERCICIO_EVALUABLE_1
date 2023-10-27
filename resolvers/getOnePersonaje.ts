import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/Personaje.ts";

const getPersonaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Personaje = await PersonajeModel.find({ id }).exec();
    if ( !Personaje ) {
      res.status(404).send("Personaje not found");
      return;
    }
    res.status(200).send({
        Personaje
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getPersonaje;