
import * as dotenv from 'dotenv'
dotenv.config()
import { Schema, model } from "mongoose"




const enckey: string = process.env.ENCRYPTION_KEY
const sigkey:string = process.env.SIGNATUREKEY


const SetPersonalSchema = new Schema({
  email: String,
  secret: String,
  password: Array<String>,
  description: Array<String>,
  timestamp: Date,
});

export const PersonalModel = model( "Personal-Information", SetPersonalSchema );



