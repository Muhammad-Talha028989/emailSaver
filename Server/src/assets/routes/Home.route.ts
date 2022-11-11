import express,{ Router,Request,Response } from 'express';

const HomeRoute: Router = express.Router()

HomeRoute.get( "/", ( req: Request, res: Response ): void =>
{
    res.send("Successful!").status(200)
} );

HomeRoute.post( "/", ( req: Request, res: Response ): void =>
{
    let responseData:unknown = req?.body?.RequestData

    console.info( responseData )
    res.send({message:"Successful!",code:200}).status(200)
})



export default HomeRoute
