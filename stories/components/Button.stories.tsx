import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { TButtonProps } from '@/components/Button';
import { ECategory } from '../constants';

type TButtonStoryProps = TButtonProps;

export default {
  title: `${ECategory.COMPONENTS}/Button`,
  component: Button,
  args: {
    label: 'Button',
  },
  argTypes: {
    badgeClassName: { control: { disable: true } },
    type: { control: { disable: true } },
    className: { control: { disable: true } },
  },
} as Meta;

const Template: Story<TButtonStoryProps> = ({ ...rest }) => <Button {...rest} />;
export const Primary = Template.bind({});
