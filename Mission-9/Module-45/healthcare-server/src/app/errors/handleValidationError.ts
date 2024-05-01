import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const handleValidationError = (error: PrismaClientValidationError) => {
  const statusCode = 403;

  return {
    statusCode,
    message: "Validation Error",
    error: error.message,
  };
};
export default handleValidationError;
