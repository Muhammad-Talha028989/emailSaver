import express,{ Express,Request,Response } from "express";
import cors from "cors"
import bodyParser, { urlencoded } from "body-parser";
import HomeRoute from "./assets/routes/Home.route";

const app: Express = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use( bodyParser.json() )

const port:number = 3000

app.use( cors( { origin: "*", methods: [ "GET", "POST", "PUT", "DELETE" ] } ) );
app.use( express.json( {} ) );
/*Home route*/
app.use( "/home", HomeRoute ) 


app.listen( port, () => console.info( "Running at port 3000" ) )