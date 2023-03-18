import './App.css';
import { Data } from './data';
import { useState } from 'react';
import { PickerPage } from './PickerPage';
import { Button, FluentProvider, Input, Label, teamsLightTheme } from '@fluentui/react-components';
import { SelectedList } from './SelectedList';
import { addSelectedFood, onAdjustSelectedFood } from './utils';
import { MealNutrition } from './MealNutrition';

export interface SelectedFood extends Data {
  percentage: number;
}

function App() {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([])
  const [showingPickerPage, setShowingPickerPage] = useState<boolean>(false)
  const [_weight, setWeight] = useState<number>(100)
  const target = 3
  const weight = _weight || 100;

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
              <div className="meal-constant">
                <Label>Meal weight (grams):</Label>
                <Input value={String(_weight)} type="number" onChange={(event, data) => setWeight(Number(data.value))}/>
              </div>
              <div className="ratio-constant">
                <Label>Target ratio:</Label>
                <Input value={String(target)} type="number" disabled/>
              </div>
            </div>
            <MealNutrition selectedFoods={selectedFoods} target={target} weight={weight}/>
            <div className="add-food-buttom">
              <Button onClick={() => setShowingPickerPage(true)}>Add more food</Button>
            </div>
            <SelectedList
              selectedFoods={selectedFoods}
              target={target}
              weight={weight}
              onAdjust={(food, percentage) => setSelectedFoods(onAdjustSelectedFood(food, percentage, selectedFoods, target))}
            />
          </div>
        )}
      </div>
    </FluentProvider>
  );
}

export default App;
