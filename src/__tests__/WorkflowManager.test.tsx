import React from 'react';

import { render } from '@testing-library/react';

import { WorkflowManager } from '../WorkflowManager';

describe('WorkflowManager component', () => {
  beforeEach(() => {
    const props = { brokerUrl: 'ws://broker.mqttdashboard.com:8000/mqtt' };

    render(<WorkflowManager {...props} />);
  });

  it('should render', () => {
    expect(true).toBeTruthy();
  });
});
