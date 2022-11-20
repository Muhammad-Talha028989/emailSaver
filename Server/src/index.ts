import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import HomeRoute from "./assets/routes/Home.route";
import { createMongodbConnection } from './assets//database/index.database';
import FetchRoute from './assets//routes/Get.info.route';
import path from "path"
const app = express();
// for deployment
app.use(express.static(path.join(__dirname + '/public')))

const PORT = process.env.PORT || process.env.PORT1 || process.env.PORT2;

app.use( cors() );
app.use( express.json( {} ) );




/* Mongoose code */
createMongodbConnection()


/*Home route*/
app.use( "/home", HomeRoute ) 

/* Get Inof route */

app.use( "/get/info", FetchRoute );


app.listen( PORT , () => console.info( `Running at PORT  ${PORT }` ) )