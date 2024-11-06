import morgan from "morgan";
//Routes
import users from "./routes/users_routes";
import clients from "./routes/clients_routes";
import services from "./routes/services_routes";
import barbers from "./routes/barbers_routes";
import turns from "./routes/turns_routes";
import hours from "./routes/hours_routes";
import { config } from "dotenv";
config();

const express = require("express");
const cors = require("cors");
const app = express();

//Settings
app.use("/tmp/uploads", express.static("/tmp/uploads"));
app.use(
  "/tmp/uploads/imageBarbers",
  express.static("tmp/uploads/imageBarbers")
);

app.use(cors());

app.set("port", process.env.PORT);

//Middlewares (funciones intermedias entre una peticion y una respuesta)
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/users", users);
app.use("/api/clients", clients);
app.use("/api/services", services);
app.use("/api/barbers", barbers);
app.use("/api/turns", turns);
app.use("/api/hours", hours);

export default app;
