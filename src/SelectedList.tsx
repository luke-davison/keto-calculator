import { Slider } from "@fluentui/react-components";
import { SelectedFood } from "./App"
import { calculateFoodWeight, getRatio } from "./utils";

interface SelectedListProps {
  selectedFoods: SelectedFood[];
  target: number;
  onAdjust: (food: SelectedFood, percentage: number) => void;
  weight: number;
}

export const SelectedList: React.FC<SelectedListProps> = props => {
  const { onAdjust, selectedFoods, target, weight } = props;

  const highestFoods = selectedFoods.filter(food => getRatio(food) > target)
  const lowestFoods = selectedFoods.filter(food => getRatio(food) < target)

  return (
    <>
      <div className="selected-list">
        <h3 className="selected-list-heading">High ratio foods</h3>
        { highestFoods.map(selectedFood => {
          return (
            <div key={selectedFood.code} className="selected-list-item">
              <div>
                <span className="selected-list-item-name">
                  {selectedFood.name}
                </span>
                <span>
                  {calculateFoodWeight(selectedFood, selectedFoods, target, weight)}g
                </span>
              </div>
              {highestFoods.length > 1 && <Slider value={selectedFood.percentage * 100} max={100} min={0} onChange={(event, data) => {
                return onAdjust(selectedFood, data.value / 100)
              }}/>}
            </div>
          )
        })}
        { highestFoods.length == 0 && (
          <div className="none-selected">
            None selected
          </div>
        )}
      </div>
      <div className="selected-list">
        <h3 className="selected-list-heading">Low ratio foods</h3>
        { lowestFoods.map(selectedFood => {
          return (
            <div key={selectedFood.code} className="selected-list-item">
              <div>
                <span className="selected-list-item-name">
                  {selectedFood.name}
                </span>
                <span>
                  {calculateFoodWeight(selectedFood, selectedFoods, target, weight)}g
                </span>
              </div>
              {lowestFoods.length > 1 && <Slider value={selectedFood.percentage * 100} max={100} min={0} onChange={(event, data) => {
                return onAdjust(selectedFood, data.value / 100)
              }}/>}
            </div>
          )
        })}
        { lowestFoods.length == 0 && (
          <div className="none-selected">
            None selected
          </div>
        )}
      </div>
    </>
  )
}