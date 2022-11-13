import * as dotenv from 'dotenv'
dotenv.config()
import { Schema, model } from "mongoose"
import encrypt from "mongoose-encryption"


const enckey: string = process.env.ENCRYPTION_KEY
const sigkey:string = process.env.SIGNATUREKEY


const SetPersonalSchema = new Schema( {
    email: String,
    password: String,
    secretKey:String,
    description:String
})

SetPersonalSchema.plugin(encrypt, {encryptedFields: ['password','secretkey'],secret:enckey });


export const PersonalModel = model( "Personal-Information", SetPersonalSchema );


