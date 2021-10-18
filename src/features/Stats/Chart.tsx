import React, { ReactChild } from 'react'
import { useHistory } from 'react-router-dom'
import {
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import PropTypes from 'prop-types'
import Text from '../../components/Text'
import { stringToColour } from '../../util/stringToColour'

function Title({ children }: { children: ReactChild }) {
  return <Text variant="title">{children}</Text>
}

interface ChartProps<T> {
  sessions: T[]
  title: string
  names: string[]
  formatter?: (value: T, index: number) => string
}

type ChartEvent = {
  activeLabel: string
}

export default function Chart<T>({ sessions, title, names, formatter }: ChartProps<T>) {
  const history = useHistory()
  const Bars = names.map((x: string) => (
    <Bar key={x} dataKey={x} name={x} stackId="a" fill={stringToColour(x)} />
  ))

  const handleClick = (event: MouseEvent & ChartEvent) => {
    const [active] = sessions.filter((session: any) => session.startDate === event.activeLabel)
    history.push('/weekly', active)
  }
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer height="100%">
        <BarChart
          onClick={handleClick}
          data={sessions}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 10,
          }}
        >
          <XAxis dataKey="startDate" />
          <YAxis tickFormatter={formatter}>
            <Label position="left" style={{ textAnchor: 'middle' }} offset={0} angle={-90}>
              Duration
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Tooltip formatter={formatter} />
          {Bars}
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
/**
 * The expected shape of the data is
 * sessions: {startDAte: String, task1: duration, task2: duration}
 * names: ['task1','task2']
 */
Chart.propTypes = {
  title: PropTypes.node,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  formatter: PropTypes.func,
  sessions: PropTypes.array,
}
Chart.defaultProps = {
  sessions: [],
  formatter: () => {},
}
