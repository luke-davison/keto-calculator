import { Slider, SliderProps } from "@fluentui/react-components";
import { SelectedFood } from "./App"
import { SelectedList } from "./SelectedList";
import { calculateFoodWeight, getRatio } from "./utils";

interface SelectedListsProps {
  selectedFoods: SelectedFood[];
  target: number;
  onAdjust: (food: SelectedFood, percentage: number) => void;
  weight: number;
  onRemove: (food: SelectedFood) => void;
}

export const SelectedLists: React.FC<SelectedListsProps> = props => {
  const { onAdjust, onRemove, selectedFoods, target, weight } = props;

  const highestFoods = selectedFoods.filter(food => getRatio(food) > target)
  const lowestFoods = selectedFoods.filter(food => getRatio(food) <= target)

  return (
    <>
      <SelectedList
        heading="High ratio foods"
        foods={highestFoods}
        selectedFoods={selectedFoods}
        onAdjust={onAdjust}
        onRemove={onRemove}
        target={target}
        weight={weight}
      />
      <SelectedList
        heading="Low ratio foods"
        foods={lowestFoods}
        selectedFoods={selectedFoods}
        onAdjust={onAdjust}
        onRemove={onRemove}
        target={target}
        weight={weight}
      />
    </>
  )
}