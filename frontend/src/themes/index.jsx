import React from 'react';
import ModernDeveloper from './ModernDeveloper';
import Minimal from './Minimal';
import DarkProfessional from './DarkProfessional';
import CreativeDesigner from './CreativeDesigner';
import Glassmorphism from './Glassmorphism';
import Corporate from './Corporate';

export const ThemeRegistry = {
  'Modern Developer': ModernDeveloper,
  'Minimal': Minimal,
  'Dark Professional': DarkProfessional,
  'Creative Designer': CreativeDesigner,
  'Glassmorphism': Glassmorphism,
  'Corporate': Corporate,
};

export const PortfolioRenderer = ({ selectedTheme, data, isPreview = false }) => {
  // Resolve theme Component. Fallback to Modern Developer if match fails.
  const Component = ThemeRegistry[selectedTheme] || ThemeRegistry['Modern Developer'];
  return <Component data={data} isPreview={isPreview} />;
};
