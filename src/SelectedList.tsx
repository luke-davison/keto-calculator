import { Slider } from "@fluentui/react-components";
import { SelectedFood } from "./App"
import { calculateFoodWeight } from "./utils";

interface SelectedListProps {
  heading: string
  foods: SelectedFood[];
  selectedFoods: SelectedFood[]
  target: number;
  onAdjust: (food: SelectedFood, percentage: number) => void;
  onRemove: (food: SelectedFood) => void;
  weight: number;
}

export const SelectedList: React.FC<SelectedListProps> = props => {
  const { heading, foods, onAdjust, onRemove, selectedFoods, target, weight } = props;

  return (
    <div className="selected-list">
      <h3 className="selected-list-heading">{ heading }</h3>
      { foods.map(selectedFood => {
        return (
          <div key={selectedFood.code} className="selected-list-item">
              <span
                className="selected-list-item-remove"
                onClick={() => onRemove(selectedFood)}
              >
                X
              </span>
            <div className="selected-list-item-inner">
              <div className="selected-list-item-text">
                <b className="selected-list-item-weight">
                  {calculateFoodWeight(selectedFood, selectedFoods, target, weight)}g
                </b>
                <span className="selected-list-item-name">
                  {selectedFood.name}
                </span>
                <span className="selected-list-item-stats">
                  {`${selectedFood.fat} / ${selectedFood.protein} / ${selectedFood.carbs}`}
                </span>
              </div>
              {foods.length > 1 && (
                <Slider
                  className="weight-slider"
                  value={selectedFood.percentage * 100}
                  max={100}
                  min={0}
                  onChange={(event, data) => {
                    return onAdjust(selectedFood, data.value / 100)
                  }}
                />
              )}
            </div>
          </div>
        )
      })}
      { foods.length === 0 && (
        <div className="none-selected">
          None selected
        </div>
      )}
    </div>
  )
}