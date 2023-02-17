import { Calculator } from './calculator';

describe('Test for Calculartor', () => {
  // f means focus, only need run this test section

  describe('Test for Multiply', () => {
    it('should return nine', () => {
      //AAA
      //Arrange - Preparar
      const calculator = new Calculator();
      //Act - Actuar Ejecutar el codigo
      const result = calculator.multiply(3, 3);
      //Assert - Resulvo mi hipotesis

      expect(result).toEqual(9);
    });
    it('should return four', () => {
      //Arrange - Preparar
      const calculator = new Calculator();
      //Act - Actuar Ejecutar el codigo
      const result = calculator.multiply(4, 1);
      //Assert - Resulvo mi hipotesis

      expect(result).toEqual(4);
    });
  });

  describe('Test for divide', () => {
    it('#divide should return some numbers', () => {
      //Arrange - Preparar
      const calculator = new Calculator();
      //Act - Actuar Ejecutar el codigo
      expect(calculator.divide(6, 3)).toEqual(2);
      expect(calculator.divide(5, 2)).toEqual(2.5);
    });

    it('#divide should return null', () => {
      //Arrange - Preparar
      const calculator = new Calculator();
      //Act - Actuar Ejecutar el codigo
      expect(calculator.divide(6, 0)).toEqual(undefined);
      expect(calculator.divide(0, 0)).toEqual(undefined);
      expect(calculator.divide(2, 0)).toEqual(undefined);
      expect(calculator.divide(3, 0)).toEqual(undefined);
    });


  it('test matchers', () => {
    //Arrange - Preparar
    const name = 'nicolas';
    let name2;
    const calculator = new Calculator();
    //Act - Actuar Ejecutar el codigo

    // Veracidad
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();
    // Boleanos
    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();

    //Numericos
    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(5);
    //Regular Expresions
    expect('123456').toMatch(/123/);

    //Array
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });
  });

});
