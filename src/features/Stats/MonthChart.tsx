import { msToHoursMinutes } from '../../util/formatters/minsToHoursMinutes'
import Chart from './Chart'
import { useMonthChartData } from './useMonthChartData'
import Loading from 'components/Loading'

/**
 * @typedef {import('rootReducer').RootState} State
 */

export default function MonthChart() {
  const { names, sessions, error, loading } = useMonthChartData()
  if (loading) return <Loading children={{}} />
  if (error) return <div>{error.toString()}</div>
  return (
    <Chart formatter={msToHoursMinutes} sessions={sessions as any} names={names} title="Month" />
  )
}
