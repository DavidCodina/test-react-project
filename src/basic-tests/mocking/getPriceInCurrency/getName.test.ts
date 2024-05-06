import { getName } from './getName'

// Uncomment this, and the return value will be undefined. Why?
// Because vi.mock('./utils') will, in fact, mock EVERY function
// in the module and replace it with vi.fn(), which by default
// returns undefined.

// vi.mock('./utils')

// If you want to set it with the expected return value do this:
// vi.mock('./utils', () => ({  getMyName: vi.fn().mockReturnValue('David') }))

/* ========================================================================

======================================================================== */

describe('getName()...', () => {
  it(`should return 'David'.`, () => {
    const result = getName()

    expect(result).toBe('David')
  })
})
