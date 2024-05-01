import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import cron from "node-cron";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AppointmentServices } from "./app/modules/Appointment/appointment.service";
import router from "./app/routes/router";

// app instance
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// payment cancel cron job
cron.schedule("* * * * *", async () => {
  try {
    AppointmentServices.cancelUnpaidAppointments();
  } catch (error) {
    console.log(error);
  }
});

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
