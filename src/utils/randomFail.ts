/**
 * This function returns true or false based on a random number.
 * @param {number} failureRate - A number between 0 and 1 indicating the failure rate.
 * @returns {boolean} Returns true if Math.random() is less than failureRate, otherwise false.
 */
export const randomFail = (failureRate: number = 1): boolean => {
  if (typeof failureRate !== 'number' || failureRate > 1 || failureRate < 0) {
    failureRate = 0.5
  }

  return Math.random() < failureRate
}
