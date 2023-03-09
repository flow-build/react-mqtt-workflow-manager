import React from 'react';

import { render } from '@testing-library/react';

import { WorkflowManager } from '../WorkflowManager';

describe('WorkflowManager component', () => {
  beforeEach(() => {
    const props = { brokerUrl: 'http://localhost:8080' };

    render(<WorkflowManager {...props} />);
  });

  it('should render', () => {
    expect(true).toBeTruthy();
  });
});
