type ErrorHandler = {
  message: String;
  code: String;
  status: Number | String;
};

export const ResponseMessageWhenSuccessful: ErrorHandler = {
  message: "Email Found Successful",
  code: "OK" || "PASS" || "SUCCESSFUL",
  status: 200,
};

export const ResponseMessageWhenUnsuccessful: ErrorHandler = {
  message: "Email Not Found",
  code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
  status: 404,
};


export const ResponseMessageWhenInputAreIncorrects: ErrorHandler = {
  message: "Plese check the both inputs or must enter correct information",
  code: "FAIL" || "WROUNG" || "UNSUCCESSFUL",
  status: 404,
};

const ResponseMessage = {
  ResponseMessageWhenSuccessful,
  ResponseMessageWhenUnsuccessful,
  ResponseMessageWhenInputAreIncorrects,
};

export default ResponseMessage