import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Timer, TimerProps } from './Timer'

export default {
  title: 'Example/Timer',
  component: Timer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<TimerProps> = (args) => <Timer {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  children: 'Timer',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Timer',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'Timer',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'Timer',
}
