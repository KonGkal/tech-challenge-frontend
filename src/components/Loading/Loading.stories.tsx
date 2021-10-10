import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Loading, LoadingProps } from './Loading'

export default {
  title: 'Example/Loading',
  component: Loading,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<LoadingProps> = (args) => <Loading {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  children: 'Loading',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Loading',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'Loading',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'Loading',
}
