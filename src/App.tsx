import './App.css';
import { Data } from './data';
import { useState } from 'react';
import { PickerPage } from './PickerPage';
import { Button, FluentProvider, Input, Label, teamsLightTheme } from '@fluentui/react-components';
import { SelectedList } from './SelectedList';
import { addSelectedFood, getPercentage, getRatio, getSumRatio, onAdjustSelectedFood } from './utils';

export interface SelectedFood extends Data {
  percentage: number;
}

function App() {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([])
  const [showingPickerPage, setShowingPickerPage] = useState<boolean>(false)
  const target = 3
  const weight = 100

  const highestFoods = selectedFoods.filter(food => getRatio(food) > target)
  const lowestFoods = selectedFoods.filter(food => getRatio(food) < target)

  let highPercentage: number = 0;
  let lowPercentage: number = 0;

  if (highestFoods.length > 0 && lowestFoods.length === 0) {
    highPercentage = 1
  } else if (lowestFoods.length > 0 && highestFoods.length === 0) {
    lowPercentage = 1
  } else if (lowestFoods.length > 0 && highestFoods.length > 0) {
    const highRatio = getSumRatio(highestFoods)
    const lowRatio = getSumRatio(lowestFoods)
  
    highPercentage = getPercentage(highRatio, lowRatio, target)
    lowPercentage = getPercentage(lowRatio, highRatio, target)
  }

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className="App">
        <h1>Keto Calculator</h1>
        {showingPickerPage ?  (
          <PickerPage
            onAdd={(newFood) => {
              if (newFood) {
                setSelectedFoods(addSelectedFood(newFood, selectedFoods, target))
              }
            }}
            onClose={() => setShowingPickerPage(false)}
            target={target}
          />
        ) : (
          <div className="calculate-page">
            <div className="constants">
              <div>
                <Label>Target ratio:</Label>
                <Input value={String(target)} type="number" disabled/>
              </div>
              <div>
                <Label>Meal weight:</Label>
                <Input value={String(weight)} type="number" disabled/>
                <span>g</span>
              </div>
            </div>

            <Button onClick={() => setShowingPickerPage(true)}>Add another food</Button>
            <SelectedList
              heading="High Ratio Foods"
              selectedFoods={highestFoods}
              target={target}
              weight={highPercentage * weight}
              onAdjust={(food, percentage) => setSelectedFoods(onAdjustSelectedFood(food, percentage, selectedFoods, target))}
            />
            <SelectedList
              heading="Low Ratio Foods"
              selectedFoods={lowestFoods}
              target={target}
              weight={lowPercentage * weight}
              onAdjust={(food, percentage) => setSelectedFoods(onAdjustSelectedFood(food, percentage, selectedFoods, target))}
            />
          </div>
        )}
      </div>
    </FluentProvider>
  );
}

export default App;
