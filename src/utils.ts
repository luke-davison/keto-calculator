import { SelectedFood } from "./App";
import { Data } from "./data";

export const getSumRatio = (foods: SelectedFood[]): number => {
  const fat = foods.reduce((sum, food) => sum + food.fat * food.percentage, 0);
  const carbs = foods.reduce((sum, food) => sum + food.carbs * food.percentage, 0);
  const protein = foods.reduce((sum, food) => sum + food.protein * food.percentage, 0);

  return fat / (carbs + protein);
}

export const getRatio = (food: Data): number => {
  return food.fat / (food.carbs + food.protein);
}

export const getPercentage = (ratio: number, otherRatio: number, target: number): number => {
  return Math.abs(otherRatio - target) / (Math.abs(otherRatio - ratio));
}

export enum RatioTypes {
  veryHigh = "Very high",
  high = "High",
  low = "Low",
  veryLow = "Very low",
  veryVeryLow = "Very very low"
}

export const getRatioType = (ratio: number, target: number): string => {
  if (ratio > target * target) {
    return RatioTypes.veryHigh
  }

  if (ratio > target) {
    return RatioTypes.high
  }

  if (ratio > 1) {
    return RatioTypes.low
  }

  if (ratio > 1 / target) {
    return RatioTypes.veryLow
  }

  return RatioTypes.veryVeryLow
}

export const getColor = (data: Data, target: number): string => {
  const ratio = getRatio(data)
  const type = getRatioType(ratio, target)

  switch (type) {
    case RatioTypes.veryHigh: return "#C7DAEB";
    case RatioTypes.high: return "#D1E6D6";
    case RatioTypes.low: return "#F2EFD5";
    case RatioTypes.veryLow: return "#F0E0D1";
    case RatioTypes.veryVeryLow: return "#F6CCD5";
    default: return "white"
  }
}

export const round = (value: number, power: number): number => {
  return Math.round(value * Math.pow(10, power)) / Math.pow(10, power)
}

export const addSelectedFood = (datum: Data, selectedFoods: SelectedFood[], target: number): SelectedFood[] => {
  const isHigh = getRatio(datum) > target;
  const otherFoods = selectedFoods.filter(food => {
    const ratio = getRatio(food)
    return isHigh ? ratio > target : ratio < target
  })

  if (otherFoods.length === 0) {
    return [...selectedFoods, { ...datum, percentage: 1 }]
  }

  const numOfFoods = otherFoods.length + 1;

  otherFoods.forEach(food => {
    food.percentage = food.percentage * (numOfFoods - 1) / numOfFoods
  })

  return [
    ...selectedFoods,
    { ...datum, percentage: 1 / numOfFoods }
  ]
}

export const onAdjustSelectedFood = (selectedFood: SelectedFood, percentage: number, selectedFoods: SelectedFood[], target: number): SelectedFood[] => {
  const isHigh = getRatio(selectedFood) > target;

  const otherFoods = selectedFoods.filter(food => {
    if (food.code === selectedFood.code) {
      return false
    }

    const ratio = getRatio(food)
    return isHigh ? ratio > target : ratio < target
  })

  const sumOfOther = otherFoods.reduce((sum, food) => sum + food.percentage, 0)

  if (sumOfOther === 0) {
    otherFoods.forEach(food => {
      food.percentage = (1 - percentage) / otherFoods.length
    })
  } else {
    otherFoods.forEach(food => {
      food.percentage = (1 - percentage) * (food.percentage / sumOfOther)
    })
  }

  selectedFood.percentage = percentage;

  return Array.from(selectedFoods);
}