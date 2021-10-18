import { format } from 'date-fns/fp'
import { useSessionsQueryQuery } from 'generated/graphql'
import { WeekData, SessionsByWeek } from 'features/Stats/useMonthChartData'
import { diffDateStrings } from 'util/diffDateStrings'
import { createDummyTasks } from 'util/dummyTasks'

const formatWeek = format('Io')
const formatDate = format('E do MMM')

type ByDayAccumulator = { names: Set<string>; sessionsByDay: SessionsByWeek }

function groupSessionsByWeekAndDay(sessions: any[]): { sessions: SessionsByWeek[] } {
  const initial: ByDayAccumulator = { names: new Set(), sessionsByDay: {} }
  const { sessionsByDay } = sessions.reduce(
    ({ names, sessionsByDay }, { startDate, endDate, name }) => {
      const dateStr = formatWeek(new Date(startDate))
      const dayStr = formatDate(new Date(startDate))
      names.add(name)
      const dayData = sessionsByDay[dayStr] || { [dayStr]: { [name]: 0 }, startDate: dateStr }

      const duration = diffDateStrings(startDate, endDate)
      let dayAndTasks
      let sameDayTask
      if (sessionsByDay[dayStr]) dayAndTasks = Object.entries(sessionsByDay[dayStr])[0]
      if (dayAndTasks && dayAndTasks.length) sameDayTask = dayAndTasks[1]

      return {
        names,
        sessionsByDay: {
          ...sessionsByDay,
          [dayStr]: {
            ...dayData,
            [dayStr]: Object.assign(
              {
                [name]: (dayData[dayStr][name] || 0) + duration,
              },
              sameDayTask,
            ),
          },
        },
      }
    },
    initial,
  )
  return { sessions: Object.values(sessionsByDay) }
}

export function useGetDataWithDay() {
  const { data, loading, error } = useSessionsQueryQuery()

  const datesArray = createDummyTasks()

  const defaultData: { names: string[]; sessions: WeekData[] } = { names: [], sessions: [] }
  if (!data || loading) return { ...defaultData, error, loading }

  return { ...groupSessionsByWeekAndDay([...datesArray, ...data.sessions]), error, loading }
}
