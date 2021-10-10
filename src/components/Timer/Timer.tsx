import React, { useEffect, useState } from 'react'
import styles from './Timer.module.scss'

export type ElapsedTime = {
  seconds: number
  minutes: number
  hours: number
}

export interface TimerProps {
  /**
   * Is this the principal call to action on the page?
   */
  color?: 'primary' | 'secondary'
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the timer be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Timer contents
   */
  children?: React.ReactNode
  /**
   * Provide your custom styles by passing a class name that will
   * be applied to the root of the component (edit to match reality)
   */
  className?: string
  /**
   * Optional click handler
   */
  onClick?: () => void

  elapsedTime: ElapsedTime
}

/**
 * Primary UI component for user interaction
 */
export const Timer = ({
  color = 'primary',
  size = 'medium',
  className = '',
  backgroundColor,
  children,
  elapsedTime,
  ...props
}: TimerProps) => {
  const [time, setTime] = useState(elapsedTime)
  const classes = [styles.wrapper, styles[color], className].join(' ').trim()

  useEffect(() => {
    const id = setInterval(
      () =>
        setTime((time) => {
          if (time.minutes >= 59) {
            setTime((time) => ({ seconds: 0, minutes: 0, hours: time.hours + 1 }))
          }
          if (time.seconds >= 59) {
            setTime((time) => ({ ...time, seconds: 0, minutes: time.minutes + 1 }))
          }
          return { ...time, seconds: time.seconds + 1 }
        }),

      1000,
    )
    return () => clearInterval(id)
  }, [])

  const prependZero = (number: number) => (number > 9 ? '' + number : '0' + number)
  return (
    <div className={classes} style={{ backgroundColor }} {...props}>
      <span>{prependZero(time.hours)}</span> : <span>{prependZero(time.minutes)}</span>:{' '}
      <span>{prependZero(time.seconds)}</span>
    </div>
  )
}

export default Timer
