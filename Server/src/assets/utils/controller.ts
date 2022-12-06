import * as dotenv from "dotenv";
dotenv.config();
import Cryptr from "cryptr";
import { Request, Response } from "express";
import { PersonalModel } from "../database/models/INF.models.schema";
import {
  ResponseMessageWhenUnsuccessful,
  ResponseMessageWhenSuccessful,
  ResponseMessageWhenInputAreIncorrects,
} from "./utils.typescript";
const cryptr = new Cryptr(process.env.SIGNATUREKEY);
export const HomeGetController = (req: Request, res: Response): void => {
  const reqData = req?.params;
  console.log(reqData);
  res.send("Successful!").status(200);
};

export const HomePostController = (req: Request, res: Response): void => {
  let responseData = req?.body?.RequestData;
  //   console.info(["request data", responseData]);
  const password: string = cryptr.encrypt(responseData.password);
  const secret: string = cryptr.encrypt(responseData.secretkey);
  const description: string = responseData?.description;
  /* Here is logic for database accessed */
  PersonalModel.find({ email: responseData?.email }).then((response) => {
    // console.info(response);
    if (response === null || response.length === 0) {
      let newPersonalDoc = new PersonalModel({
        email: responseData?.email,
        secret: secret,
        password: [password],
        description: [responseData?.description],
        timestamp: Date.now(),
      }).save();
      console.info("Data added to database successful");
      return;
    } else {
      PersonalModel.findOneAndUpdate(
        { email: responseData?.email },
        {
          $push: {
            password: password,
            description: description,
          },
        },
        { returnDocument: "after" },
        (error, FOAUResult) => {
          console.info(`after insert into database ==> ${FOAUResult} `);
        },
      );
    }
  });

  res
    .send({ message: "Successful!", code: 200, isSuccessful: true })
    .status(200);
};

export const PersonalGetController = (req: Request, res: Response): void => {
  res.send("Successful!").status(200);
};

export const PersonalPostController = (req: Request, res: Response): void => {
  let responseData = req?.body.RequestData;
  // console.info( [ "request data", responseData ] )
  let { email, secretkey } = req?.body?.RequestData;
  // let secret:string = cryptr.encrypt(responseData?.secretkey)
  if (!email && secretkey) {
    let isExist: Boolean = false; /* Mean found no secret matched */
    PersonalModel.find({}, {}, {}).then((responseResult) => {
      if (responseResult) {
        responseResult?.map((emailDoc) => {
          let secretDecrypt: string = cryptr.decrypt(emailDoc?.secret || "");

          if (secretDecrypt === responseData?.secretkey) {
            let PasswordDecrptArray: Array<String> = [];
            emailDoc?.password?.map((items) => {
              PasswordDecrptArray.push(cryptr.decrypt(items || ""));
            });
            const ResponseObject = {
              email: emailDoc?.email,
              password: PasswordDecrptArray,
              description: emailDoc?.description,
            };
            // Error email found sucessful
            isExist = true;
            res.send({ ...ResponseMessageWhenSuccessful, ResponseObject });
            return;
          }
        });
      }
    });
    if (!isExist) {
      // Error email not found
      res.send({ ...ResponseMessageWhenUnsuccessful, resData: {} });
    }
  } else if (email && secretkey) {
    PersonalModel.findOne({ email: responseData?.email }).then(
      (resultResponse) => {
        if (resultResponse) {
          let secretDecrypt: string = cryptr.decrypt(
            resultResponse?.secret || "",
          );
          let PasswordDecrptArray: Array<String> = [];
          resultResponse?.password?.map((items) => {
            PasswordDecrptArray.push(cryptr.decrypt(items || ""));
          });
          if (secretDecrypt === responseData?.secretkey) {
            const ResponseObject = {
              email: resultResponse?.email,
              password: PasswordDecrptArray,
              description: resultResponse?.description,
            };
            // Error email found sucessful
            res.send({ ...ResponseMessageWhenSuccessful, ResponseObject });
          } else {
            // Error email not found
            res.send({ ...ResponseMessageWhenUnsuccessful, resData: {} });
          }
        } else {
          // Please check the both input or must enter correct information Error.
          res.send({ ...ResponseMessageWhenInputAreIncorrects, resData: {} });
        }
      },
    );
  } else {
    // Please check the both input or must enter correct information Error.

    res.send({ ...ResponseMessageWhenInputAreIncorrects, resData: {} });
  }
};

const HomeController = {
  HomeGetController,
  HomePostController,
};

const PersonalController = {
  PersonalGetController,
  PersonalPostController,
};

const Controller = {
  ...HomeController,
  ...PersonalController,
};
export default Controller;
