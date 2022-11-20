import * as dotenv from "dotenv"
dotenv.config()
import {utils} from "./assets/utils/index.utils"
const { express, Request, Response, cors, bodyParser, urlencoded, HomeRoute, createMongodbConnection, FetchRoute, app } = utils;


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use( bodyParser.json() )

const port: string = process.env.PORT || process.env.PORT1 || process.env.PORT2;

app.use( cors( { origin: "*", methods: [ "GET", "POST", "PUT", "DELETE" ] } ) );
app.use( express.json( {} ) );

/* Mongoose code */
createMongodbConnection()


/*Home route*/
app.use( "/home", HomeRoute ) 

/* Get Inof route */

app.use( "/get/info", FetchRoute );


app.listen( port, () => console.info( `Running at port ${port}` ) )