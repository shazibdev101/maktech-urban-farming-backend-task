import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
console.log("App initialized");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

export default app;