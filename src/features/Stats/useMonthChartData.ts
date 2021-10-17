import { format } from 'date-fns/fp'
import { useSessionsQueryQuery } from '../../generated/graphql'
import { Session } from '../../types'
import { diffDateStrings } from '../../util/diffDateStrings'
import { createDummyTasks } from 'util/dummyTasks'

const formatWeek = format('Io')

export type WeekData = { [name: string]: number }
export type SessionsByWeek = { [date: string]: any }
type accumulator = { names: Set<string>; sessionsByWeek: SessionsByWeek }

function groupSessionsByWeek(sessions: Session[]) {
  const initial: accumulator = { names: new Set(), sessionsByWeek: {} }
  const { names, sessionsByWeek } = sessions.reduce(
    ({ names, sessionsByWeek }, { startDate, endDate, name }) => {
      const dateStr = formatWeek(new Date(startDate))
      names.add(name)
      const dayData = sessionsByWeek[dateStr] || { [name]: 0, startDate: dateStr }

      const duration = diffDateStrings(startDate, endDate)

      return {
        names,
        sessionsByWeek: {
          ...sessionsByWeek,
          [dateStr]: {
            ...dayData,
            [name]: (dayData[name] || 0) + duration,
          },
        },
      }
    },
    initial,
  )

  return { names: Array.from(names), sessions: Object.values(sessionsByWeek) }
}

export function useMonthChartData() {
  const { data, loading, error } = useSessionsQueryQuery()

  const datesArray = createDummyTasks()

  // We need to type this data or TS will infer it as names: string[] | never[]
  const defaultData: { names: string[]; sessions: WeekData[] } = { names: [], sessions: [] }
  if (!data || loading) return { ...defaultData, error, loading }

  return { ...groupSessionsByWeek([...datesArray, ...data.sessions]), error, loading }
}
