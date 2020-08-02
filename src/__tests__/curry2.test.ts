import curry2 from '_utils/curry2';

test('curry2()', () => {
  const fn = jest.fn((a, b) => a + b);
  const cfn = curry2(fn);
  const result = cfn(1)(2);
  expect(result).toBe(3);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(1, 2);
});
