import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { WeeklySummary, WeeklySummaryProps } from './WeeklySummary'

export default {
  title: 'Example/WeeklySummary',
  component: WeeklySummary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<WeeklySummaryProps> = (args) => <WeeklySummary {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  children: 'WeeklySummary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'WeeklySummary',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'WeeklySummary',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'WeeklySummary',
}
