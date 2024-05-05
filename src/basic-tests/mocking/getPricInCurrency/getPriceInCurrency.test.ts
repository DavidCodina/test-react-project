import { getPriceInCurrency } from './'
import * as utils from './utils'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Module Mocking:
//
// In this example, we are mocking getExchangeRate(), which is used internally
// within getPriceInCurrency()
//
// getPriceInCurrency() is more or less a dummy function used for this example.
// Internally, it calls getExchangeRate() which just returns Math.random().
// The return value of getPriceInCurrency() is the product of price * rate,
// where rate is also a random number (by extension).
//
// The goal is to make an assertion against getPriceInCurrency(). However, we can't
// actually know in advance what the return value will be because getExchangeRate()
// returns a random number.
//
// In order to control this, and isolate only the logic for getPriceInCurrency(), we
// can mock utils.ts module. Note: this is a strong argument in favor of
// creating utility functions with a single responsibility and modularizing them into
// a separate file.
//
// Since we've mocked getExchangeRate() such that the return value will always be 1.5,
// we can confidently assert that the expected value here will be 15.
//
/////////////////////////
//
// There are actually many different approaches to mdoule mocking. By doing this:
//
//   vi.mock('./utils') // Hoisted to top of file in Vitest, but not necessarily in Jest.
//
// Then for the test we can do this:
//
//   import { getExchangeRate } from './utils'
//
//   ...
//
//   it('should return price in target currency.', () => {
//     vi.mocked(getExchangeRate).mockReturnValue(1.5)
//     const price = getPriceInCurrency(10, 'AUD')
//     expect(price).toBe(15)
//   })
//
//  According to Mosh, "Vitest will replace EVERY exported function in this module with a mock function."
//  He says this in video 37 at 2:30.
//
//  That statement is not entirely accurate. By mocking the module, any functions or variables exported from it
//  can be overridden or mocked for testing purposes. However, Vitest will only replace the functions that are explicitly mocked
//  with vi.mock or vi.mocked. In other words, vi.mock('./utils') alone does not mock all the functions in the ./utils module.
//  It simply creates a mock implementation of the entire module, allowing you to selectively mock specific functions or variables
//  exported from that module. Thus, if we had a second test case that did this, it will still call the actual
//  implementation of getExchangeRate:
//
//   it(`should return a price that is of type 'number'.`, () => {
//     const price = getPriceInCurrency(10, 'AUD')
//     expect(price).toBeTypeOf('number')
//   })
//
// In video 41 (Partial Mocking) of Mosh's Mastering Javascript Unit Testing he says again that EVERY function
// in the module will be replaced with a mock function, but this is simply not true. I don't know why he
// thinks this. It might be a remnant of an early version of Vitest, or some older Jest behavior.
//
/////////////////////////
//
// Initially, the idea of mocking EVERY function in a particular module freaked me out.
// That's not what I want to do! That may be okay if we only have one function in the module,
// but what if we have multiple functions in the module, and don't want them all to get mocked?
// Solution, you can do this instead:
//
//   import * as utils from './utils'
//
//   it('should return price in target currency.', () => {
//     vi.mock('./utils', async () => {
//       const originalModule = await vi.importActual<typeof utils>('./utils')
//       return {
//         ...originalModule,
//         getExchangeRate: vi.fn().mockReturnValue(1.5)
//       }
//     })
//     const price = getPriceInCurrency(10, 'AUD')
//     expect(price).toBe(15)
//   })
//
// Better yet, just do this for the mock with vi.importActual
//
//   vi.mock('./utils', async (importOriginal) => {
//     const originalModule: any = await importOriginal()
//     return {
//       ...originalModule,
//       getExchangeRate: vi.fn().mockReturnValue(1.5)
//     }
//   })
//
// However, after futher research it turns out that using vi.importActual is
// not necessary in this case, as Vitest's vi.mock function already handles
// unmocked functions correctly. Any other functions from the original ./utils
// module will be left untouched and will use their original implementations.
// This means we can simply use the following implementation, which is essentially,
// a more concise version of the one suggested by Mosh.
//
//   vi.mock('./utils', () => ({
//     getExchangeRate: vi.fn().mockReturnValue(1.5),
//   }));
//
// Again, in video 41 on partial mocking Mosh says that if we don't provide the function
// as the second argument and spread ...originalModule then Vitest
// will replace EVERY function in that module with vi.fn().
//
// The statement about Vitest replacing every function in the module with vi.fn() if the second argument
// is not provided seems to be outdated or possibly referring to an older version of Vitest or a different
// testing framework like Jest. In the current version of Vitest, calling vi.mock('./utils') without providing
// a second argument DOES NOT automatically mock all functions in the module with vi.fn(). Instead, it creates
// a mock implementation of the module, but all functions and variables retain their original implementations
// UNLESS EXPLICITLY MOCKED using vi.mocked().
//
// It really seems like the behavior of Vitest has changed since the videos were created.
// A similar example exists in Academind tutorials where he simply did vi.mock('fs'), to
// prevent the Node fs module from running. He also indicated that "ALL functions are then
// replaced with mock functions."
//
///////////////////////////////////////////////////////////////////////////

describe('getPriceInCurrency()...', () => {
  // beforeEach(() => { vi.clearAllMocks() })
  // const getExchangeRateSpy = vi.spyOn(utils, 'getExchangeRate')

  it('should return price in target currency.', () => {
    ///////////////////////////////////////////////////////////////////////////
    //
    // You could also spy on the the specific function as described here:
    // https://www.chakshunyu.com/blog/how-to-mock-only-one-function-from-a-module-in-jest/
    //
    //  vi.spyOn(utils, 'getExchangeRate').mockReturnValue(1.5)
    //
    // Pros:
    //   - It's a more concise and straightforward way to mock a single function.
    //
    //   - It doesn't require creating a separate mock module.
    //
    // Cons:
    //   - It modifies the original module directly, which can lead to unintended side effects
    //     if not used carefully.
    //
    //   - It might not work as expected if the module is imported in multiple places or if the
    //     function being mocked is reassigned later in the code.
    //
    ///////////////////////////////////////////////////////////////////////////

    vi.mock('./utils', () => ({
      getExchangeRate: vi.fn().mockReturnValue(1.5)
    }))

    const price = getPriceInCurrency(10, 'AUD')
    expect(price).toBe(15)
  })

  it(`should return a price that is of type 'number'.`, () => {
    const price = getPriceInCurrency(10, 'AUD')
    expect(price).toBeTypeOf('number')
  })

  // You can do this. However, in principle it is veering away
  // from specifically unit testing getPriceInCurrency().
  it(`should call getExchangeRate() once.`, () => {
    // In this case, we don't want to replace getExchangeRate() with a mock,
    // but we do want to watch it or spy on it to make sure it executed.
    // Note: the args accepted by spyOn only really make sense when you
    // think of it as module and module method.
    const getExchangeRateSpy = vi.spyOn(utils, 'getExchangeRate')
    getPriceInCurrency(10, 'AUD')

    ///////////////////////////////////////////////////////////////////////////
    //
    // Because getExchangeRateSpy is defined within this test,
    // it will only be relative to this test. However, if we
    // defined it at the top of the describe block, then it would
    // be relative to the entire block, and at this point it will
    // have been called 3 times. In that case, you would probably
    // need to implement logic to reset the spy before each test.
    // There are several options such as mockClear, clearAllMocks,
    // mockRest() and mockRestore(). Thus at the top of describe, we
    // might do this:
    //
    //   beforeEach(() => { vi.clearAllMocks() })
    //   const getExchangeRateSpy = vi.spyOn(utils, 'getExchangeRate')
    //
    // That said, it's just easier to define stuff locally, we can also
    // make set  vi.clearAllMocks() from within vite.config.ts
    //
    //   test: { clearMocks: true }
    //
    // See Mosh video 43.
    //
    ///////////////////////////////////////////////////////////////////////////

    expect(getExchangeRateSpy).toHaveBeenCalledTimes(1)
    expect(getExchangeRateSpy).toHaveBeenCalledWith(
      'USD',
      'AUD' /* expect.any(String) */
    )

    expect(getExchangeRateSpy).toReturnWith(expect.any(Number))
  })
})
