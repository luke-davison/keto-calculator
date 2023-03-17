import { Slider } from "@fluentui/react-components";
import { SelectedFood } from "./App"

interface SelectedListProps {
  heading: string;
  selectedFoods: SelectedFood[];
  target: number;
  onAdjust: (food: SelectedFood, percentage: number) => void;
}

export const SelectedList: React.FC<SelectedListProps> = props => {
  const { heading, onAdjust, selectedFoods, target } = props

  return (
    <div className="selected-list">
      <h3 className="selected-list-heading">{heading}</h3>
      { selectedFoods.map(selectedFood => (
        <div key={selectedFood.code} className="selected-list-item">
          <div className="selected-list-item-name">
            {selectedFood.name}
          </div>
          {selectedFoods.length > 1 && <Slider value={selectedFood.percentage * 100} max={100} min={0} onChange={(event, data) => {
            console.log(data)
            return onAdjust(selectedFood, data.value / 100)
          }}/>}
        </div>
      ))}
      { selectedFoods.length == 0 && (
        <div className="none-selected">
          None selected
        </div>
      )}
    </div>
  )
}