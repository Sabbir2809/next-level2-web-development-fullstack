export interface ISchedule {
  startDateTime: string;
  endDateTime: string;
  startTime: string;
  endTime: string;
}

export interface IFilterRequest {
  startDate?: string | undefined;
  endDate?: string | undefined;
}
