import { sum } from './index'

///////////////////////////////////////////////////////////////////////////
//
// None of the functions below need to be imported if you
// set up the vite.config.ts + tsconfig.json for globals.
// import { describe, expect, test, it } from 'vitest'
//
// For this to work you need this in vite.config.ts - test: { globals: true }
// And this in tsconfig.json -  "types": ["vitest/globals"],
//
///////////////////////////////////////////////////////////////////////////

describe('The sum() function...', () => {
  test('should return 0 with no numbers.', () => {
    // AAA: Arrange, Act, Assert

    // Arrange: N/A

    // Act
    const result = sum()

    // Assert
    expect(result).toBe(0)
  })

  it('should return same number when only one arg is provided.', () => {
    const value = 5
    const expected = value
    const result = sum(value)
    expect(result).toBe(expected)
  })

  it("should return a value that is typeof 'number' and NOT NaN.", () => {
    const result = sum(1, 2, 3)
    // Gotcha: NaN is typeof number: console.log(typeof NaN) => 'number',
    // so this might not be the best approach.
    expect(result).toBeTypeOf('number')
    // Thus we can add this as well.
    expect(result).not.toBeNaN()
  })

  test('should return correct sum with multiple args.', () => {
    // AAA: Arrange, Act, Assert

    // Arrange
    const values = [1, 2, 3]
    const expected = 6

    // Act
    const result = sum(...values)

    // Assert
    expect(result).toBe(expected)
  })
})
