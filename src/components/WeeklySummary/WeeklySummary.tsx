import React from 'react'
import styles from './WeeklySummary.module.scss'
import { useLocation } from 'react-router'
import { useCreateWeekAndDays } from 'util/useCreateWeekAndDays'
import { WeekData } from 'features/Stats/useMonthChartData'
import { Link } from 'react-router-dom'
export interface WeeklySummaryProps {
  /**
   * Is this the principal call to action on the page?
   */
  color?: 'primary' | 'secondary'
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the weeklysummary be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * WeeklySummary contents
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

type HoursPerDay = {
  day: string
  hours: string
}

/**
 * Primary UI component for user interaction
 */
export const WeeklySummary = ({
  color = 'primary',
  size = 'medium',
  className = '',
  backgroundColor,
}: WeeklySummaryProps) => {
  const classes = [styles.wrapper, styles[color], className].join(' ').trim()

  const { state }: { state: WeekData } = useLocation()

  const [hourWorkedPerWeek, hourWorkedPerDay, week] = useCreateWeekAndDays(state)

  const days = hourWorkedPerDay.map(
    (day: HoursPerDay): JSX.Element => {
      return (
        <li key={day.hours + day.day}>
          <p>
            <span>👷‍♂️</span>: {day.day}, <span>⏱</span> : {day.hours}
          </p>
        </li>
      )
    },
  )

  return (
    <React.Fragment>
      <h2>{hourWorkedPerWeek}</h2>
      <Link to={`/daily/${week}`}>Daily Summary</Link>
      <div>
        <ul className={classes} style={{ backgroundColor }}>
          {days}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default WeeklySummary
