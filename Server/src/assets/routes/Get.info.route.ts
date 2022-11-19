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
    let { email, secretkey } = req?.body?.RequestData;
    // let secret:string = cryptr.encrypt(responseData?.secretkey)
    if ( !email && secretkey)
    {
        let isExist: Boolean = false; /* Mean found no secret matched */
        PersonalModel.find( {}, {}, {} ).then( ( responseResult ) =>
        {
            if ( responseResult )
            {
                responseResult?.map( ( emailDoc ) =>
                {
                    let secretDecrypt: string = cryptr.decrypt( emailDoc?.secret || "" )

                    if ( secretDecrypt === responseData?.secretkey )
                    {
                        let PasswordDecrptArray: Array<String> = []
                        emailDoc?.password?.map( items =>
                        {
                            PasswordDecrptArray.push( cryptr.decrypt( items || "" ) )
                        } )

                        const Errors: ErrorHandler = {
                            message: "Email Found Successful",
                            code: "OK" || "PASS" || "SUCCESSFUL",
                            status: 200
                        }
                        const ResponseObject = {
                            email: emailDoc?.email,
                            password: PasswordDecrptArray,
                            description: emailDoc?.description
                        }
                        isExist = true
                        res.send( { ...Errors, ResponseObject } )
                        return
                    }
                } )
            }
        } );
        if (!isExist) {
            const Errors: ErrorHandler = {
                message: "Email Not Found",
                code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
                status: 404
            }
            res.send( { ...Errors, resData: {} } );
        }
    }
    else if (email && secretkey) {
        PersonalModel.findOne( { email: responseData?.email } ).then( resultResponse =>
        {
            if ( resultResponse )
            {
                let secretDecrypt: string = cryptr.decrypt( resultResponse?.secret || "" )
                let PasswordDecrptArray: Array<String> = []
                resultResponse?.password?.map( items =>
                {
                    PasswordDecrptArray.push( cryptr.decrypt( items || "" ) )
                } )
                if ( secretDecrypt === responseData?.secretkey )
                {
                    const Errors: ErrorHandler = {
                        message: "Email Found Successful",
                        code: "OK" || "PASS" || "SUCCESSFUL",
                        status: 200
                    }
                    const ResponseObject = {
                        email: resultResponse?.email,
                        password: PasswordDecrptArray,
                        description: resultResponse?.description
                    }
                    res.send( { ...Errors, ResponseObject } )
                }
                else
                {
                    const Errors: ErrorHandler = {
                        message: "Email Not Found",
                        code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
                        status: 404
                    }
                    res.send( { ...Errors, resData: {} } )
                } 
            }
            else
            {
                const Errors: ErrorHandler = {
                    message: "Plese check the both inputs or must enter correct information",
                    code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
                    status: 404
                };
                res.send( { ...Errors, resData: {} } );
            }

        } )
    } else {
        const Errors: ErrorHandler = {
            message: "Plese check the both inputs or must enter correct information",
            code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
            status: 404
        };
        res.send( { ...Errors, resData: {} } );
    }
})



export default FetchRoute
