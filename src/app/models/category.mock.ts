import { faker } from '@faker-js/faker';
import { Category } from './category.model';

export const generateOneCategory = (): Category => {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.department(),
  };
};

export const generateManyCategories = (size = 10): Category[] => {
  const categories: Category[] = [];
  for (let index = 0; index < size; index++) {
    categories.push(generateOneCategory());
  }

  return [...categories]; //this prevent the rist of mutations
};
