import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { UserRoutes } from "./app/modules/User/user.routes";

// express app
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Prisma Power!" });
});

app.use("/api/v1/user", UserRoutes);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
