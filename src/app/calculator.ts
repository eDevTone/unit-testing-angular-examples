export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): any {
    if (b === 0) {
      return undefined;
    }
    return a / b;
  }
}
