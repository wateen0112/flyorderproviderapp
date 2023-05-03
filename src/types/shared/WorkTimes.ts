export interface Time {
  startTime: string
  endTime: string
}

export type WeekDays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
export interface WorkTime {
  daysOfWeek: WeekDays[]
  times: Time[]
}
export class WorkTimeDto implements WorkTime {
  daysOfWeek = [];
  times = [
    {
      startTime: '',
      endTime: '',
    },
  ]
}
