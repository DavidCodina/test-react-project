import { getName } from './'
// import { getMyName } from '../utils'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Uncomment this, and the return value will be undefined. Why?
// Because vi.mock('../utils') will, in fact, mock EVERY function
// in the module and replace it with vi.fn(), which by default
// returns undefined.
//
// vi.mock('../utils')
//
// If you want to set it with the expected return value do this:
// vi.mock('../utils', () => ({  getMyName: vi.fn().mockReturnValue('David') }))
//
/////////////////////////
//
// Alternatively, you can do this:
//
//   import { getName } from './'
//   import { getMyName } from '../utils'
//
//   vi.mock('../utils')
//
//   describe('getName()...', () => {
//     it(`should return 'David'.`, () => {
//       vi.mocked(getMyName).mockReturnValue('David')
//       const result = getName()
//       expect(result).toBe('David')
//     })
//
//     it(`should return 'Holly'.`, () => {
//       // The result Will still be 'David' unless we change vi.mocked().
//       // vi.mocked() modifies the vi.mock(). Thus, vi.mocked is NOT an
//       // encapsulated change, and it WILL affect the hoisted version of the mock.
//
//       vi.mocked(getMyName).mockReturnValue('Holly')
//       const result = getName()
//       expect(result).toBe('Holly')
//     })
//   })
//
///////////////////////////////////////////////////////////////////////////

describe('getName()...', () => {
  it(`should return 'David'.`, () => {
    const result = getName()
    expect(result).toBe('David')
  })
})
