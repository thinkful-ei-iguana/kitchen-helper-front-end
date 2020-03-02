function myCalculator() {
  const num1 = 3;
  const num2 = 7;
  const sum = num1 + num2;
  return sum;
}

it("should add num1 and num2 to be sum", () => {
  expect(myCalculator()).toBe(10);
});
