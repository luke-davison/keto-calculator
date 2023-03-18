import { Slider } from "@fluentui/react-components";
import { SelectedFood } from "./App"
import { round } from "./utils";

interface SelectedListProps {
  heading: string;
  selectedFoods: SelectedFood[];
  target: number;
  onAdjust: (food: SelectedFood, percentage: number) => void;
  weight: number;
}

export const SelectedList: React.FC<SelectedListProps> = props => {
  const { heading, onAdjust, selectedFoods, weight } = props

  return (
    <div className="selected-list">
      <h3 className="selected-list-heading">{heading}</h3>
      { selectedFoods.map(selectedFood => {
        return (
          <div key={selectedFood.code} className="selected-list-item">
            <div>
              <span className="selected-list-item-name">
                {selectedFood.name}
              </span>
              <span>
                {round(selectedFood.percentage * weight, 0)}g
              </span>
            </div>
            {selectedFoods.length > 1 && <Slider value={selectedFood.percentage * 100} max={100} min={0} onChange={(event, data) => {
              return onAdjust(selectedFood, data.value / 100)
            }}/>}
          </div>
        )
      })}
      { selectedFoods.length == 0 && (
        <div className="none-selected">
          None selected
        </div>
      )}
    </div>
  )
}