import { Data } from "./data";
import { getColor, getRatio, getRatioType, round } from "./utils";

interface PickerPageSelectedOptionProps {
  selectedFood: Data | undefined;
  target: number;
}


export const PickerPageSelectedFood: React.FC<PickerPageSelectedOptionProps> = props => {
  const { selectedFood, target } = props

  const ratio = selectedFood ? round(getRatio(selectedFood), 2) : 0

  return (
    <div className="selected-option" style={{ backgroundColor:selectedFood && getColor(selectedFood, target) }}>
      <div className="selected-option-row">
        <div className="selected-option-name">
          {selectedFood?.name ?? "No food selected"}
        </div>
      </div>
      <div className="selected-option-row">
        <div className="selected-option-ratio">
          {selectedFood && ("Ratio: " + ratio)}
        </div>
        <div className="selected-option-type">{selectedFood && (getRatioType(ratio, target) + " fat")}</div>
      </div>
      <div className="selected-option-row">
        <div className="selected-option-fat">
          <div>Fat</div>
          <div>{selectedFood?.fat}</div>
        </div>
        <div className="selected-option-protein">
          <div>Protein</div>
          <div>{selectedFood?.protein}</div>
        </div>
        <div className="selected-option-carbs">
          <div>Carbs</div>
          <div>{selectedFood?.carbs}</div>
        </div>
      </div>
    </div>
  )
}