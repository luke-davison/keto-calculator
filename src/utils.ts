import { SelectedFood } from "./App";
import { Data } from "./data";

export const getIsPossible = (foods: SelectedFood[], target: number): boolean => {
  return foods.some(food => getRatio(food) > target)
    && foods.some(food => getRatio(food) < target)
}

export interface RatioRange {
  min: number,
  max: number
}

export const getRatio = (food: Data): number => {
  return food.fat / (food.carbs + food.protein);
}

export const getPercentage = (ratio: number, otherRatio: number, target: number): number => {
  return Math.abs(otherRatio - target) / (Math.abs(otherRatio - ratio));
}

export const getRatioRange = (food: SelectedFood, foods: SelectedFood[], target: number): RatioRange => {
  const ratio = getRatio(food)

  const underTargetFood = foods.filter(otherFood => otherFood.code !== food.code && getRatio(otherFood) < target)
    .sort((foodA, foodB) => getRatio(foodA) - getRatio(foodB))
  const overTargetFood = foods.filter(otherFood => otherFood.code !== food.code && getRatio(otherFood) > target)
    .sort((foodA, foodB) => getRatio(foodA) - getRatio(foodB))

  let min = 0, max = 1;

  if (ratio > target) {
    const lowestUnderFoodRatio = getRatio(underTargetFood[0]);
    max = getPercentage(ratio, lowestUnderFoodRatio, target)
    
    if (overTargetFood.length > 0) {
      min = 0
    } else {
      const highestUnderFoodRatio = getRatio(underTargetFood[underTargetFood.length - 1]);
      min = getPercentage(ratio, highestUnderFoodRatio, target)
    }
  } else {
    const highestOverFoodRatio = getRatio(overTargetFood[overTargetFood.length - 1]);
    max = getPercentage(ratio, highestOverFoodRatio, target)
    
    if (underTargetFood.length > 0) {
      min = 0
    } else {
      const lowestOverFoodRatio = getRatio(overTargetFood[0]);
      min = getPercentage(ratio, lowestOverFoodRatio, target)
    }
  }

  return { min, max }
}

export enum RatioTypes {
  veryHigh = "Very high",
  high = "High",
  low = "Low",
  veryLow = "Very low"
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

  return RatioTypes.veryLow
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

  return [
    ...selectedFoods.map(food => ({
      ...food,
      percentage: food.percentage * (numOfFoods - 1) / numOfFoods
    })),
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

  const difference = selectedFood.percentage - percentage;
  const numOfFoods = otherFoods.length + 1;

  if (otherFoods.every(food => round(food.percentage, 4) === 0)) {
    otherFoods.forEach(food => {
      food.percentage = difference / (numOfFoods - 1)
    })
  } else {
    otherFoods.forEach(food => {
      food.percentage += difference / (numOfFoods - 1)
    })
  }

  selectedFood.percentage = percentage;

  return Array.from(selectedFoods);
}