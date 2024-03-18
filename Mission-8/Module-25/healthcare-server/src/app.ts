import cors from "cors";
import express, { Application, Request, Response, urlencoded } from "express";
import { UserRoutes } from "./app/modules/User/user.route";

// instance
const app: Application = express();
// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// health check
app.get("/", (req: Request, res: Response) => {
  res.send("Healthcare Server: All is Well");
});

// router
app.use("/api/v1", UserRoutes);

export default app;
