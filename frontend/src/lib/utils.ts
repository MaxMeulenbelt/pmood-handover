/**
 * Calculates the average of an array of numbers.
 *
 * @param array An array of numbers
 * @returns The average value of the array, or 0 if the array is empty
 */
const average = (array: number[]) => array.reduce((a, b) => a + b, 0) / array.length || 0

export default {
  average,
}
