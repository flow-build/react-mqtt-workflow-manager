import React from 'react';
import { Meta, Story } from '@storybook/react';
import { WorkflowManager, WorkflowManagerProps } from '../src';

const meta: Meta = {
  title: 'WorkflowManager',
  component: WorkflowManager,
  args: {},
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Standard: Story<WorkflowManagerProps> = args => (
  <WorkflowManager {...args} />
);
