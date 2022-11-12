import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose"

const uri: string = process.env.CONNECTION_STRING 
export const createMongodbConnection = () =>
{
   return mongoose.connect( uri).then(()=> console.info("successful connect with cloud database...")).catch(error => console.error(["mongoose Error",error]))
}



