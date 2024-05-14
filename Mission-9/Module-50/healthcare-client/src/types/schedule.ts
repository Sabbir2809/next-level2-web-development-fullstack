export type TSchedule = {
  id?: string;
  startDateTime: string;
  endDateTime: string;
};

export type TScheduleFrom = {
  startDateTime: Date;
  endDateTime: Date;
  startTime: string;
  endTime: string;
};
