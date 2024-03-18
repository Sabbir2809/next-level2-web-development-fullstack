import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes/router";

// app instance
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// application routes
app.use("/api/v1", router);

// health check
app.get("/", (req: Request, res: Response) => {
  res.send("Healthcare Server: All is Well");
});

export default app;
