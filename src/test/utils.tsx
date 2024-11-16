import React from 'react';
import { render as testingLibraryRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

// Create a custom render function that includes providers if needed
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return testingLibraryRender(ui, { wrapper: AllProviders, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };