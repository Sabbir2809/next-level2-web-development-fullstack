import { Types } from "mongoose";

export interface ISemesterRegistration {
  academicSemesterId: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
}
