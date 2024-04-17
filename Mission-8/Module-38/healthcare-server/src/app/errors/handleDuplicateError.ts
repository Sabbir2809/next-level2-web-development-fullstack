import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const handleDuplicateError = (error: PrismaClientKnownRequestError) => {
  const statusCode = 409;

  return {
    statusCode,
    message: "Duplication Key Error",
    error: error.meta,
  };
};
export default handleDuplicateError;
