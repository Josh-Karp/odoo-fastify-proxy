import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

function Template(args) {
  return <Button {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  size: 'large',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'contained',
  color: 'secondary',
  size: 'large',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  color: 'primary',
  size: 'large',
};

export const Muted = Template.bind({});
Muted.args = {
  variant: 'muted',
  size: 'large',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'disabled',
  size: 'large',
};

export const Selection = Template.bind({});
Selection.args = {
  variant: 'selection',
  size: 'large',
};
