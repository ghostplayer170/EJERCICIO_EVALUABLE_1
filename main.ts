import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getPersonajes from "./resolvers/getPersonajes.ts";
import getOnePersonaje from "./resolvers/getOnePersonaje.ts";
import addPersonaje from "./resolvers/addPersonaje.ts";
import deletePersonaje from "./resolvers/deletePersonaje.ts";
import modifyPersonaje from "./resolvers/modifyPersonaje.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

//const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
// const MONGO_URL = "mongodb+srv://rmontenegrop:1qa2ws3ed@clusteruni.b32fnrm.mongodb.net/DataBaseTierraMieda?retryWrites=true&w=majority";
const MONGO_URL = "mongodb+srv://rmontenegrop:1qa2ws3ed@clusteruni.pagju8q.mongodb.net/?retryWrites=true&w=majority";

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app
  .get("/api/tierramedia/personajes", getPersonajes)
  .get("/api/tierramedia/personajes/:id", getOnePersonaje)
  .post("/api/tierramedia/personajes", addPersonaje)
  .delete("/api/tierramedia/personajes/:id", deletePersonaje)
  .put("/api/tierramedia/personajes/:id", modifyPersonaje);

app.listen(3006, () => {
  console.log("Server listening on port 3006");
});