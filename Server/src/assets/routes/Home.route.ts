import express,{ Router,Request,Response } from 'express';
import { PersonalModel } from './../database/models/INF.models.schema';

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
    console.info(["request data",responseData])
    let newPersonalDoc = new PersonalModel( {
        email: responseData?.email,
        password: responseData?.password,
        secretKey: responseData?.secretKey,
        description: responseData?.description
    }).save()
    res.send({message:"Successful!",code:200,isSuccessful:true}).status(200)
})



export default HomeRoute
