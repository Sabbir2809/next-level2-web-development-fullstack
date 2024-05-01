export type TErrorResponse = {
  statusCode: number;
  message: string;
  error: any;
};

export type TErrorDetails = {
  field: string | number;
  message: string;
}[];
