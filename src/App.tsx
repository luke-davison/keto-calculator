import './App.css';
import { Data } from './data';
import { useState } from 'react';
import { PickerPage } from './PickerPage';
import { Button, FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { SelectedList } from './SelectedList';
import { addSelectedFood, getRatio, onAdjustSelectedFood } from './utils';

export interface SelectedFood extends Data {
  percentage: number;
}

function App() {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([])
  const [showingPickerPage, setShowingPickerPage] = useState<boolean>(false)
  const target = 3

  const highestFoods = selectedFoods.filter(food => getRatio(food) > target)
  const lowestFoods = selectedFoods.filter(food => getRatio(food) < target)

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
            <Button onClick={() => setShowingPickerPage(true)}>Add another food</Button>
            <SelectedList
              heading="High Ratio Foods"
              selectedFoods={highestFoods}
              target={target}
              onAdjust={(food, percentage) => setSelectedFoods(onAdjustSelectedFood(food, percentage, selectedFoods, target))}
            />
            <SelectedList
              heading="Low Ratio Foods"
              selectedFoods={lowestFoods}
              target={target}
              onAdjust={(food, percentage) => setSelectedFoods(onAdjustSelectedFood(food, percentage, selectedFoods, target))}
            />
          </div>
        )}
      </div>
    </FluentProvider>
  );
}

export default App;
