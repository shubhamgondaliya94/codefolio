import React from 'react';
import BrutalistMonolith from './BrutalistMonolith';
import EditorialSerif from './EditorialSerif';
import TerminalGreen from './TerminalGreen';
import SwissGrid from './SwissGrid';
import HighContrast from './HighContrast';
import Architectural from './Architectural';

export const ThemeRegistry = {
  'Brutalist Monolith': BrutalistMonolith,
  'Editorial Serif': EditorialSerif,
  'Terminal Green': TerminalGreen,
  'Swiss Grid': SwissGrid,
  'High Contrast': HighContrast,
  'Architectural': Architectural,
};

export const PortfolioRenderer = ({ selectedTheme, data, isPreview = false }) => {
  // Resolve theme Component. Fallback to Brutalist if match fails.
  const Component = ThemeRegistry[selectedTheme] || ThemeRegistry['Brutalist Monolith'];
  return <Component data={data} isPreview={isPreview} />;
};
