import mongoose from "mongoose"

const uri: string = "mongodb+srv://Muhammad-Talha:3b5b6Gdxd1O7zSVU@email-saver.slbib6z.mongodb.net/EmailSaver?retryWrites=true&w=majority" || "mongodb+srv://Muhammad-Talha:3b5b6Gdxd1O7zSVU@email-saver.slbib6z.mongodb.net/EmailSaver"
export const createMongodbConnection = () =>
{
   return mongoose.connect( uri).then(()=> console.info("successful connect with cloud database...")).catch(error => console.error(["mongoose Error",error]))
}



