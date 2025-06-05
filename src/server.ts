// On  importe le module express qui sera utilisé pour faire tourner notre serveur Noder
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import router from "./routes";
import { env } from "./config/env";

const app = express();
const { PORT, ORIGIN } = env;

app.use(cors({
  origin: ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/", router);

app.listen(PORT, () => {
  console.log("Le serveur est en écoute sur: http://localhost:" + PORT);
});
