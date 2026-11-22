
export function makeId(): string {
  return Math.random().toString(36).slice(2, 7);
}


export function changeNumber(value: number, amount: number, min: number, max: number): number {
  let result = value + amount;

  if (result < min) {
    result = min;
  }
  if (result > max) {
    result = max;
  }


  return Math.round(result * 100) / 100;
}