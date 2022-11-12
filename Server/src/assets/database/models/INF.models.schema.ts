import * as dotenv from 'dotenv'
dotenv.config()
import { Schema, model } from "mongoose"
import encrypt from "mongoose-encryption"


const enckey: string = process.env.ENCRYPTION_KEY
const sigkey:string = process.env.SIGNATUREKEY

const testSchema = new Schema( {
    name: {
        type:String
    },
    age: {
        type:Number
    }
},{})

testSchema.plugin(encrypt, {encryptedFields: ['name'],secret:enckey });


export const testModel = model( "Demo", testSchema );


