import express,{ Router,Request,Response } from 'express';
import { PersonalModel } from './../database/models/INF.models.schema';

const FetchRoute: Router = express.Router()

FetchRoute.get( "/", ( req: Request, res: Response ): void =>
{
    res.send("Successful!").status(200)
} );

FetchRoute.post( "/", ( req: Request, res: Response ): void =>
{
    let responseData = req?.body.RequestData;
    console.info( [ "request data", responseData] )
    PersonalModel.findOne( { email: responseData?.email } ).then( resultResponse =>
    {
        console.info( resultResponse );
    })
})



export default FetchRoute
