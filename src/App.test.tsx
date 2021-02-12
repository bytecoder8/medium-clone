import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders global feed', () => {
  render(<App />);
  const linkElement = screen.getByText(/Global Feed/i);
  expect(linkElement).toBeInTheDocument();
});
