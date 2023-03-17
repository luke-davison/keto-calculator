import { Data } from "./data";
import { getRatio, getRatioType, round } from "./utils";

interface PickerPageSelectedOptionProps {
  selectedFood: Data | undefined;
  target: number;
}


export const PickerPageSelectedFood: React.FC<PickerPageSelectedOptionProps> = props => {
  const { selectedFood, target } = props

  if (!selectedFood) {
    return null
  }

  const ratio = getRatio(selectedFood)

  return (
    <div className="selected-option">
      <div className="selected-option-name">{selectedFood.name}</div>
      <div className="selected-option-type">{getRatioType(ratio, target)}</div>
      <div className="selected-option-ratio">{round(ratio, 2)}</div>
      <div className="selected-option-fat">{selectedFood.fat}</div>
      <div className="selected-option-protein">{selectedFood.protein}</div>
      <div className="selected-option-carbs">{selectedFood.carbs}</div>
    </div>
  )
}