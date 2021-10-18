import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { DailySummary, DailySummaryProps } from './DailySummary'

export default {
  title: 'Example/DailySummary',
  component: DailySummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<DailySummaryProps> = (args) => <DailySummary {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  children: 'DailySummary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'DailySummary',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'DailySummary',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'DailySummary',
}
