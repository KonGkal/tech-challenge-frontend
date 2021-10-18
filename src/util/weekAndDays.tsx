import { msToHourMinSec } from './formatters/msToHourMinSec'
import React from 'react'
import { WeekData } from '../features/Stats/useMonthChartData'
type HoursPerDay = {
  day: string
  hours: string
}
type CreateWeekAndDaysReturnValue = [JSX.Element, HoursPerDay[], number]

export const createWeekAndDays = (week: WeekData): CreateWeekAndDaysReturnValue => {
  let sumOfHours = 0
  const hoursPerDay: HoursPerDay[] = []
  for (let hour in week) {
    if (typeof week[hour] === 'number') {
      const timeWorkedInDay = msToHourMinSec(week[hour])
      hoursPerDay.push({
        day: hour,
        hours: `${timeWorkedInDay[0]}:${timeWorkedInDay[1]}:${timeWorkedInDay[2]}`,
      })
      sumOfHours += week[hour]
    }
  }

  const timeWorked = msToHourMinSec(sumOfHours)

  const weekElement = (
    <React.Fragment>
      Week: {week.startDate}, hours worked: {timeWorked[0]}:{timeWorked[1]}:{timeWorked[2]}
    </React.Fragment>
  )

  return [weekElement, hoursPerDay, week.startDate]
}
