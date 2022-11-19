import * as dotenv from 'dotenv'
dotenv.config()
import Cryptr from 'cryptr'
import express,{ Router,Request,Response } from 'express';
import { PersonalModel } from './../database/models/INF.models.schema';
const cryptr = new Cryptr(process.env.SIGNATUREKEY);
const HomeRoute: Router = express.Router()


HomeRoute.get( "/", ( req: Request, res: Response ): void =>
{
    const reqData = req?.params;
    console.log( reqData );
    res.send("Successful!").status(200)
} );

HomeRoute.post( "/", ( req: Request, res: Response ): void =>
{
    let responseData = req?.body?.RequestData
    // console.info( [ "request data", responseData ] )
    const password: string = cryptr.encrypt( responseData.password )
    const secret: string = cryptr.encrypt( responseData.secretkey )
    /* Here is logic for database accessed */
    PersonalModel.find( { email: responseData?.email } ).then( ( response ) =>
    {
        console.info( response )
        if ( response === null || response.length === 0 )
        {
            let newPersonalDoc = new PersonalModel( {
                email: responseData?.email,
                secret: secret,
                password: [ password ],
                description: responseData?.description,
                timestamp: Date.now()
            } ).save()
            console.info( "Data added to database successful" )
            return
        }
        else
        {
            PersonalModel.findOneAndUpdate( { email: responseData?.email }, {
                $push: {
                    password: password
                }
            }, { returnDocument: "after" }, ( error, FOAUResult ) => {
               /* No Logic Heres */
            } )
        }

    } )

    res.send( { message: "Successful!", code: 200, isSuccessful: true } ).status( 200 )
} )



export default HomeRoute
