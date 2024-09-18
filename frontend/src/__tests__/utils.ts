import utils from '../lib/utils'

describe('average()', () => {
  it('should return 0.0 for an empty array', () => {
    expect(utils.average([])).toBe(0.0)
  })

  it('should correctly calculate the average for a populated array', () => {
    expect(utils.average([1, 2, 3, 4, 5])).toBe(3.0)
  })
})
