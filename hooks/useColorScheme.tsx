import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type Scheme = 'light' | 'dark';

type ColorSchemeContextValue = {
  colorScheme: Scheme;
  toggleColorScheme: () => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(undefined);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const deviceScheme = useDeviceColorScheme() ?? 'light';
  const [colorScheme, setColorScheme] = useState<Scheme>(deviceScheme);
  const toggleColorScheme = () => setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorScheme must be used within ColorSchemeProvider');
  }
  return context.colorScheme;
}

export function useToggleColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useToggleColorScheme must be used within ColorSchemeProvider');
  }
  return context.toggleColorScheme;
}
