import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Esteban', 'QS', 27, 90, 1.77);
  });

  it('attrs', () => {
    expect(person.name).toEqual('Esteban');
    expect(person.lastName).toEqual('QS');
    expect(person.age).toEqual(27);
  });

  describe('test for calcIMC', () => {

    it('should return a string: down', () => {
      //Arrange
      person.weight = 40;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC()
      //Assert
      expect(rta).toEqual('down');
    });

    it('should return a string: normal', () => {
      //Arrange
      person.weight = 58;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC()
      //Assert
      expect(rta).toEqual('normal');
    });

    it('should return a string: overweight', () => {
      //Arrange
      person.weight = 68;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC()
      //Assert
      expect(rta).toEqual('overweight');
    });


    it('should return a string: overweight level 1', () => {
      //Arrange
      person.weight = 73;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC()
      //Assert
      expect(rta).toEqual('overweight level 1');
    });

    it('should return a string: overweight level 2', () => {
      //Arrange
      person.weight = 83;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC()
      //Assert
      expect(rta).toEqual('overweight level 2');
    });

    it('should return a string: overweight level 3', () => {
      //Arrange
      person.weight = 108;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC()
      //Assert
      expect(rta).toEqual('overweight level 3');
    });

    it('should return a string: not found', () => {
          //Arrange
          person.weight = 0;
          person.height = 0;
          //Act
          const rta = person.calcIMC()
          //Assert
          expect(rta).toEqual('not found');
    });
    it('should return a string: not found', () => {
          //Arrange
          person.weight = -230;
          person.height = -86;
          //Act
          const rta = person.calcIMC()
          //Assert
          expect(rta).toEqual('not found');
    })

  });
});
