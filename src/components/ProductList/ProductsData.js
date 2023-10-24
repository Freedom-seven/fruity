// Import your product images here

import {
  apple,
  strawberry,
  banana,
  pineapple,
  grapes,
  mango,
  watermelon,
  carrot,
  spinach,
  tomato,
  garlic,
  onion,
  orange,
  zucchini,
  bellpepper,
  cucumber,
  broccoli,
  kiwi,
  pear,
} from "../../assets/images";

const products = [
  // Fruits
  {
    id: 1,
    name: "Organic Apples",
    price: 2.99,
    image: apple,
    category: "fruits",
    description: "Fresh organic apples for a healthy snack.",
    variations: [
      { id: 101, name: "Red Apples" },
      { id: 102, name: "Green Apples" },
    ],
    weight: 150, // in grams
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    price: 3.49,
    image: strawberry,
    category: "fruits",
    description: "Sweet and juicy strawberries to satisfy your cravings.",
    variations: [],
    weight: 250, // in grams
  },
  {
    id: 3,
    name: "Ripe Bananas",
    price: 1.99,
    image: banana,
    category: "fruits",
    description: "Ripe bananas, perfect for making delicious smoothies.",
    variations: [],
    weight: 120, // in grams
  },
  {
    id: 4,
    name: "Organic Pineapples",
    price: 2.99,
    image: pineapple,
    category: "fruits",
    description: "Sweet and tropical organic pineapples.",
    variations: [],
    weight: 800, // in grams
  },
  {
    id: 5,
    name: "Fresh Grapes",
    price: 3.49,
    image: grapes,
    category: "fruits",
    description: "Assorted fresh grapes for a fruity delight.",
    variations: [
      { id: 103, name: "Red Grapes" },
      { id: 104, name: "Green Grapes" },
    ],
    weight: 500, // in grams
  },
  {
    id: 6,
    name: "Ripe Mango",
    price: 1.99,
    image: mango,
    category: "fruits",
    description: "Ripe and succulent mangoes for a tropical treat.",
    variations: [],
    weight: 200, // in grams
  },
  {
    id: 7,
    name: "Organic Watermelon",
    price: 2.99,
    image: watermelon,
    category: "fruits",
    description: "Juicy and refreshing organic watermelons.",
    variations: [],
    weight: 5000, // in grams
  },
  {
    id: 8,
    name: "Fresh Oranges",
    price: 2.49,
    image: orange,
    category: "fruits",
    description: "Sweet and tangy fresh oranges.",
    variations: [],
    weight: 180, // in grams
  },
  {
    id: 9,
    name: "Ripe Pears",
    price: 2.79,
    image: pear,
    category: "fruits",
    description: "Delicious ripe pears for a healthy dessert.",
    variations: [],
    weight: 200, // in grams
  },
  {
    id: 10,
    name: "Juicy Kiwis",
    price: 2.29,
    image: kiwi,
    category: "fruits",
    description: "Tropical kiwis packed with vitamins.",
    variations: [],
    weight: 100, // in grams
  },
  // Vegetables
  {
    id: 11,
    name: "Fresh Carrots",
    price: 1.49,
    image: carrot,
    category: "vegetables",
    description: "Fresh and crisp carrots for your salads.",
    variations: [],
    weight: 200, // in grams
  },
  {
    id: 12,
    name: "Leafy Spinach",
    price: 2.49,
    image: spinach,
    category: "vegetables",
    description: "Leafy and nutritious spinach leaves.",
    variations: [],
    weight: 150, // in grams
  },
  {
    id: 13,
    name: "Plum Tomatoes",
    price: 1.29,
    image: tomato,
    category: "vegetables",
    description: "Plum and juicy tomatoes for your recipes.",
    variations: [],
    weight: 120, // in grams
  },
  {
    id: 14,
    name: "Organic Zucchinis",
    price: 2.99,
    image: zucchini,
    category: "vegetables",
    description: "Organic zucchinis for your favorite dishes.",
    variations: [],
    weight: 250, // in grams
  },
  {
    id: 15,
    name: "Fresh Bell Peppers",
    price: 2.79,
    image: bellpepper,
    category: "vegetables",
    description: "Colorful bell peppers for your salads.",
    variations: [],
    weight: 180, // in grams
  },
  {
    id: 16,
    name: "Crisp Cucumbers",
    price: 1.99,
    image: cucumber,
    category: "vegetables",
    description: "Crisp cucumbers, perfect for snacking.",
    variations: [],
    weight: 160, // in grams
  },
  {
    id: 17,
    name: "Garlic Bulbs",
    price: 1.49,
    image: garlic,
    category: "vegetables",
    description: "Garlic bulbs for adding flavor to your dishes.",
    variations: [],
    weight: 50, // in grams
  },
  {
    id: 18,
    name: "Fresh Onions",
    price: 0.99,
    image: onion,
    category: "vegetables",
    description: "Fresh onions, a kitchen staple for various cuisines.",
    variations: [],
    weight: 100, // in grams
  },
  {
    id: 19,
    name: "Green Broccoli",
    price: 1.79,
    image: broccoli,
    category: "vegetables",
    description: "Nutritious green broccoli for your meals.",
    variations: [],
    weight: 200, // in grams
  },
  // Add more products here...
];

export default products;
