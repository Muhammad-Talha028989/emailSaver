import * as dotenv from "dotenv";
dotenv.config();
import Cryptr from "cryptr";
import express, { Router, Request, Response } from "express";
import { PersonalModel } from "./../database/models/INF.models.schema";
import { HomeGetController, HomePostController } from "../utils/controller";

const HomeRoute: Router = express.Router();

HomeRoute.get("/", HomeGetController);

HomeRoute.post("/", HomePostController);

export default HomeRoute;
