import * as dotenv from "dotenv"
dotenv.config()
import express, {Express, Request, Response } from "express"
import cors from "cors"
import bodyParser, { urlencoded } from "body-parser";
import HomeRoute from "../routes/Home.route";
import { createMongodbConnection } from '../database/index.database';
import FetchRoute from '../routes/Get.info.route'

const app:Express = express()

export const utils = {
    express,
    app,
    Request,
    Response,
    cors,
    bodyParser,
    urlencoded,
    HomeRoute,
    createMongodbConnection,
    FetchRoute
}

export default utils