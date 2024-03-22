import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes/router";

// app instance
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// health check
app.get("/", (req: Request, res: Response) => {
  res.send("Healthcare Server: All is Well");
});

// application routes
app.use("/api/v1", router);

// global error
app.use(globalErrorHandler);

// notFound
app.use(notFound);

export default app;
