import React, { useState } from 'react'
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
  return (
    <div className={classes} style={{ backgroundColor }} {...props}>
      <span></span>
    </div>
  )
}

export default Timer
