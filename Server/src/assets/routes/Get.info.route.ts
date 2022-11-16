import * as dotenv from 'dotenv'
dotenv.config()
import express, { Router, Request, Response } from 'express'
import { PersonalModel } from './../database/models/INF.models.schema';
import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.SIGNATUREKEY);
const FetchRoute: Router = express.Router()

type ErrorHandler = {
    message: String,
    code: String,
    status: Number | String
}

FetchRoute.get( "/", ( req: Request, res: Response ): void =>
{
    res.send("Successful!").status(200)
} );

FetchRoute.post( "/", ( req: Request, res: Response ): void =>
{
    let responseData = req?.body.RequestData;
    // console.info( [ "request data", responseData ] )
    
    // let secret:string = cryptr.encrypt(responseData?.secretkey)
    PersonalModel.findOne( { email: responseData?.email} ).then( resultResponse =>
    {
        let secretDecrypt: string = cryptr.decrypt( resultResponse?.secret );

        if ( secretDecrypt === responseData?.secretkey )
        {
            const Errors: ErrorHandler = {
                message: "Email Found Successful",
                code: "OK" || "PASS" || "SUCCESSFUL",
                status: 200
            }
            res.send( Errors );
        }
        else
        {
            const Errors: ErrorHandler = {
                message: "Email Not Found",
                code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
                status: 404 
            };
            res.send(Errors)
        }
    })
})



export default FetchRoute
