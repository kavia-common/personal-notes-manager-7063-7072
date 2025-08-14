import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Notes title in navbar', () => {
  render(<App />);
  const titleElement = screen.getByText(/Notes/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search notes.../i);
  expect(searchInput).toBeInTheDocument();
});

test('renders new note button', () => {
  render(<App />);
  const newButton = screen.getByText(/New Note/i);
  expect(newButton).toBeInTheDocument();
});
