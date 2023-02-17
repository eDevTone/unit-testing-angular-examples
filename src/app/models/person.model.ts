export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
  ) {}

  calcIMC(): string {
    if (this.weight < 0 || this.height < 0) return 'not found';

    const imc = Math.round(this.weight / (this.height * this.height));
    console.log('imc', imc);
    if (imc < 0) {
      return 'not found';
    } else if (imc >= 0 && imc < 18) {
      return 'down';
    } else if (imc <= 24) {
      return 'normal';
    } else if (imc <= 26) {
      return 'overweight';
    } else if (imc <= 29) {
      return 'overweight level 1';
    } else if (imc <= 39) {
      return 'overweight level 2';
    } else if (imc >= 40) {
      return 'overweight level 3';
    } else {
      return 'not found';
    }
  }
}
