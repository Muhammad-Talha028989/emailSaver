import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import HomeRoute from "./assets/routes/Home.route";
import { createMongodbConnection } from './assets//database/index.database';
import FetchRoute from './assets//routes/Get.info.route';

const app = express();

const PORT = process.env.PORT || process.env.PORT1 || process.env.PORT2;

app.use( cors( { origin: "*", methods: [ "GET", "POST", "PUT", "DELETE" ] } ) );
app.use( express.json( {} ) );

// for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static("Client/dist/index.html"))
}

/* Mongoose code */
createMongodbConnection()


/*Home route*/
app.use( "/home", HomeRoute ) 

/* Get Inof route */

app.use( "/get/info", FetchRoute );


app.listen( PORT , () => console.info( `Running at PORT  ${PORT }` ) )