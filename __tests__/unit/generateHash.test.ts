import { generateHash } from '../../src/generateHash'

describe('generateHash unit test', () => {
  it('return random 8 character', () => {
    expect(generateHash().length).toBe(8)
  })
  it('return random character', () => {
    expect(generateHash()).not.toBe(generateHash())
  })
  it('return random other value character', () => {
    expect(generateHash(7).length).toBe(7)
  })
  it('return random other value character', () => {
    expect(generateHash(7, 'a')).toBe('aaaaaaa')
  })
})
