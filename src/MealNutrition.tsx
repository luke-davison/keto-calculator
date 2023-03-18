import { SelectedFood } from "./App"
import { calculateFoodWeight, round } from "./utils";

interface MealNutritionProps {
  selectedFoods: SelectedFood[];
  target: number;
  weight: number;
}

export const MealNutrition: React.FC<MealNutritionProps> = props => {
  const { selectedFoods, target, weight } = props

  let fat: number = 0, protein: number = 0, carbs: number = 0;

  selectedFoods.forEach(food => {
    const foodWeight = calculateFoodWeight(food, selectedFoods, target, weight)
    fat += foodWeight * food.fat / 100;
    protein += foodWeight * food.protein / 100;
    carbs += foodWeight * food.carbs / 100;
  })

  return (
    <div className="meal-nutrition">
      <div className="meal-nutrition-item">
        <div>Fat</div>
        <div>{round(fat, 2)}</div>
      </div>
      <div className="meal-nutrition-item">
        <div>Protein</div>
        <div>{round(protein, 2)}</div>
      </div>
      <div className="meal-nutrition-item">
        <div>Carbs</div>
        <div>{round(carbs, 2)}</div>
      </div>

      <div className="meal-nutrition-item">
        <div>Ratio</div>
        <div>{selectedFoods.length > 0 ? round(fat / (protein + carbs), 2) : undefined}</div>
      </div>
    </div>
  )
}