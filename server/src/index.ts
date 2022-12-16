import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as UserController from "./controllers/user";
import * as MapController from "./controllers/map";
import * as CommentController from "./controllers/comment";
import { registerValidation } from "./validations/auth";
import checkAuth from "./utils/check-auth";

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", UserController.login);
app.post("/me/scorechange", checkAuth, UserController.changeScore);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/leaderboard", checkAuth, UserController.getLeaders);

app.get("/game/map", checkAuth, MapController.loadMap);

app.post("/comment", checkAuth, CommentController.addNew);
app.get("/comments/all", checkAuth, CommentController.getAll);

app.listen(process.env.PORT || 3001, () => {
  console.log("server started");
});
