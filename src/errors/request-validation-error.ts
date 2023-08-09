import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public reasons: ValidationError[]) {
    super("Error about validation request");

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.reasons.map((reason) => {
      if (reason.type === "field") {
        return { message: reason.msg, field: reason.path };
      }
      return { message: reason.msg };
    });

    return formattedErrors;
  }
}
