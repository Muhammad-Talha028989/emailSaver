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
    console.info( [ "request data", responseData ] );
    const password:string = cryptr.encrypt(responseData.password);
    const secret: string = cryptr.encrypt( responseData.secretkey );
    /* Here is logic for database accessed */
    PersonalModel.find( { email: responseData?.email} ).then( ( response ) =>
    {
        if ( response === null )
        {
            let newPersonalDoc = new PersonalModel( {
                email: responseData?.email,
                secret: secret,
                password: password,
                description: responseData?.description
            } ).save()
            console.info("Data added to database successful")
            return 
        }
        console.info( "Here database information" );
    })

    // PersonalModel.findOne( { email: responseData?.email } ).then( ( response ) =>
    // {
    //     const secretKey: string = cryptr.decrypt( response.secret )
    //     console.info(secretKey)
    // })
    res.send( { message: "Successful!", code: 200, isSuccessful: true } ).status( 200 )
})



export default HomeRoute
