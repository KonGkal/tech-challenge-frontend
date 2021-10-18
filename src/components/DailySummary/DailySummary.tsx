import React from 'react'
import styles from './DailySummary.module.scss'
import { useParams } from 'react-router'
import { useGetDataWithDay } from './useGetDataWithDay'
import Loading from 'components/Loading'
import { msToHourMinSec } from 'util/formatters/msToHourMinSec'

export interface DailySummaryProps {
  /**
   * Is this the principal call to action on the page?
   */
  color?: 'primary' | 'secondary'
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the dailysummary be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * DailySummary contents
   */
  children: React.ReactNode
  /**
   * Provide your custom styles by passing a class name that will
   * be applied to the root of the component (edit to match reality)
   */
  className?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */

type WeekParam = {
  week: string
}
export const DailySummary = ({
  color = 'primary',
  size = 'medium',
  className = '',
  backgroundColor,
  children,
  ...props
}: DailySummaryProps) => {
  const classes = [styles.wrapper, styles[color], className].join(' ').trim()
  const { week } = useParams<WeekParam>()

  const { sessions, error, loading } = useGetDataWithDay()
  if (loading) return <Loading />
  if (error) return <div>{error.toString()}</div>

  const sessionsOfTheWeek = sessions.filter((session) => session.startDate === week)

  let listItems: JSX.Element[] = []

  for (let day in sessionsOfTheWeek) {
    const dayAndDate = Object.keys(sessionsOfTheWeek[day])[0]
    const nameAndDurationTuples: [string, number][] = Object.entries(
      sessionsOfTheWeek[day][dayAndDate],
    )
    const domElements = nameAndDurationTuples.map((day: [string, number]) => {
      const formattedTaskDuration = msToHourMinSec(day[1])
      return (
        <li key={day[1]}>
          <p>
            {dayAndDate}, Task:{day[0]}, Duration: {formattedTaskDuration[0]}:
            {formattedTaskDuration[1]}:{formattedTaskDuration[2]}
          </p>
        </li>
      )
    })
    listItems = [...listItems, ...domElements]
  }

  return (
    <div className={classes} style={{ backgroundColor }}>
      <ul>{listItems}</ul>
    </div>
  )
}

export default DailySummary
