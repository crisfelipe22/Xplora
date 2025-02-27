// setupTests.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
// If using Vitest
beforeAll(() => {
  global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: vi.fn(), // Deprecated, but MUI might still call it
      removeListener: vi.fn(),
      addEventListener: vi.fn(), // New API
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };
});


// Mock MUI breakpoints
// vi.mock('@mui/material/styles', () => ({
//   ...vi.importActual('@mui/material/styles'),
//   useTheme: () => ({
//     breakpoints: {
//       up: () => { },
//       down: () => { },
//       between: () => { },
//       only: () => { },
//       values: {
//         mobile: 0,
//         tablet: 744,
//         desktop: 1440,
//       },
//     },
//   }),
// }));