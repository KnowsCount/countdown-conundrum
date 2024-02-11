export function generateNumbers() {
  const numbers = []
  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      // Choose from 25, 50, 75, 100 for the first two numbers
      numbers.push([25, 50, 75, 100][Math.floor(Math.random() * 4)])
    } else {
      // Choose from 1 to 10 for the rest
      numbers.push(Math.floor(Math.random() * 10) + 1)
    }
  }
  return numbers
  }
  
export function generateTarget(numbers: number[]) {
  // This is a placeholder. You'll need to implement the actual logic.
  // For example, you could choose a random number between the smallest and largest possible sums.
  return Math.floor(Math.random() * (numbers.reduce((a, b) => a + b, 0) - numbers.length + 1)) + numbers.length
}

export function generateSolution(numbers: number[], target: number) {
  // This is a placeholder. You will need to implement the actual logic.
  // This could involve generating all possible combinations of the numbers using the four basic arithmetic operations,
  // and then checking if any of them give the target number.
  return 'Solution goes here'
}