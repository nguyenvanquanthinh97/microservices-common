import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorValidation = validationResult(req);

  if (!errorValidation.isEmpty()) {
    throw new RequestValidationError(errorValidation.array());
  }

  next();
};
