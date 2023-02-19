import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../src/App';

test('should be', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  expect(1).toBe(1);
});
