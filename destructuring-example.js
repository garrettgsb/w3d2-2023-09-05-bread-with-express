const fruits = [
  'apple',
  'banana',
  'canteloupe',
  'durian',
];

const first = fruits[0];
const second = fruits[1];
const third = fruit[2];

const [first, second, third] = fruits;


const vegetables = {
  broccoli: 17,
  zucchini: 9,
  carrot: 12,
};

const broccoli = vegetables.broccoli;
const zucchini = vegetables.zucchini;
const carrot = vegetables.carrot;

const { broccoli, zucchini, carrot } = vegetables;

fruits.map(fruit => fruit.toUpperCase());
