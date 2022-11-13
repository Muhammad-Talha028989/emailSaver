import * as dotenv from 'dotenv'
dotenv.config()
import { Schema, model } from "mongoose"



const enckey: string = process.env.ENCRYPTION_KEY
const sigkey:string = process.env.SIGNATUREKEY


const SetPersonalSchema = new Schema( {
    email: String,
    secret:String,
    password: String,
    description:String
})

export const PersonalModel = model( "Personal-Information", SetPersonalSchema );



