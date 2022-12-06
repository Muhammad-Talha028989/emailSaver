import * as dotenv from 'dotenv'
dotenv.config()
import express, { Router} from 'express'

import {
  PersonalGetController,
  PersonalPostController,
} from "./../utils/controller";

const FetchRoute: Router = express.Router()

FetchRoute.get( "/", PersonalGetController);

FetchRoute.post("/", PersonalPostController);

export default FetchRoute
