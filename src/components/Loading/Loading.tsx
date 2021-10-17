import React from 'react'
import styles from './Loading.module.scss'

export interface LoadingProps {
  /**
   * Is this the principal call to action on the page?
   */
  color?: 'primary' | 'secondary'
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the loading be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Loading contents
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
}

/**
 * Primary UI component for user interaction
 */

const loadingImg = 'https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg'

export const Loading = ({
  color = 'primary',
  size = 'medium',
  className = '',
  backgroundColor,
  children,
}: LoadingProps) => {
  return (
    <div className={styles.spinner}>
      <img src={loadingImg} alt="Loading spinner" />
    </div>
  )
}

export default Loading
