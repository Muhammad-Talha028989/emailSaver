import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from "express"
import cors from "cors"
import bodyParser, { urlencoded } from "body-parser";
import HomeRoute from "./assets/routes/Home.route";
import { createMongodbConnection } from './assets/database/index.database';
import { testModel } from './assets/database/models/INF.models.schema';
const app: Express = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use( bodyParser.json() )

const port: string = process.env.PORT || process.env.PORT1 || process.env.PORT2;

app.use( cors( { origin: "*", methods: [ "GET", "POST", "PUT", "DELETE" ] } ) );
app.use( express.json( {} ) );

/* Mongoose code */
createMongodbConnection()
// const newtest = new testModel( {
//     name: "Muhammad Talha",age:23
// } ).save();

testModel.findOne( { age: 23 } ).then( result =>
{
    console.info(["Result",result])
})


/*Home route*/
app.use( "/home", HomeRoute ) 


app.listen( port, () => console.info( `Running at port ${port}` ) )