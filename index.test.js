const { serialize, deserialize, getCompressionPercent } = require('.');

const generateRandomArray = (length, max, min) => (
  [...new Array(length)]
    .map(() => (Math.floor(Math.random() * max)) + min)
);

const testArray = (array) => {
  const serializedString = serialize(array);
  getCompressionPercent(array, serializedString);
  expect(deserialize(serializedString)).toEqual(array);
}

it ('Сериализация массива из 50 случайных чисел', () => {
  const arrayOf50 = generateRandomArray(50, 300, 1);
  testArray(arrayOf50);
});

it ('Сериализация массива из 100 случайных чисел', () => {
  const arrayOf100 = generateRandomArray(100, 300, 1);
  testArray(arrayOf100);
});

it ('Сериализация массива из 500 случайных чисел', () => {
  const arrayOf500 = generateRandomArray(500, 300, 1);
  testArray(arrayOf500);
});

it ('Сериализация массива из 1000 случайных чисел', () => {
  const arrayOf1000 = generateRandomArray(1000, 300, 1);
  testArray(arrayOf1000);
});

it ('Сериализация массива, где все числа 1 знака', () => {
  const arrayOfOneDigitsNumbers = generateRandomArray(1000, 9, 1);
  testArray(arrayOfOneDigitsNumbers);
});

it ('Сериализация массива, где все числа 2-ух знаков', () => {
  const arrayOfTwoDigitsNumbers = generateRandomArray(1000, 90, 10);
  testArray(arrayOfTwoDigitsNumbers);
});

it ('Сериализация массива, где все числа 3-ех знаков', () => {
  const arrayOfThreeDigitsNumbers = generateRandomArray(1000, 200, 100);
  testArray(arrayOfThreeDigitsNumbers);
});

it ('Сериализация массива из 900 чисел, по 3 каждого', () => {
  let arrayOf900 = [];
  for (let i = 1; i <= 300; i++) {
    for (let j = 1; j <=3; j++) {
      arrayOf900.push(i)
    }
  }
  testArray(arrayOf900);
});