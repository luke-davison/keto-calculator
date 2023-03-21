import './App.css';
import { Data } from './data';
import { useState } from 'react';
import { PickerPage } from './PickerPage';
import { Button, FluentProvider, Input, InputProps, Label, teamsLightTheme } from '@fluentui/react-components';
import { addSelectedFood, onAdjustSelectedFood, updateFoodOnTargetChange } from './utils';
import { MealNutrition } from './MealNutrition';
import { SelectedLists } from './SelectedLists';

export interface SelectedFood extends Data {
  percentage: number;
}

const _defaultWeight = 100;
const _defaultTarget = 3

function App() {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([])
  const [showingPickerPage, setShowingPickerPage] = useState<boolean>(false)
  const [_weight, setWeight] = useState<string>(String(_defaultWeight))
  const [_target, setTarget] = useState<string>(String(_defaultTarget))
  const weight = (!_weight || isNaN(Number(_weight))) ? _defaultWeight : Number(_weight);
  const target = (!_target || isNaN(Number(_target))) ? _defaultTarget : Number(_target);

  const onChangeTarget: InputProps["onChange"] = (event, data) => {
    setTarget(data.value)
    const newTarget = (!data.value || isNaN(Number(data.value))) ? _defaultTarget : Number(data.value);
    const updatedFoods = updateFoodOnTargetChange(selectedFoods, newTarget, target);
    if (updatedFoods) {
      setSelectedFoods(updatedFoods)
    }
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
            selectedFoods={selectedFoods}
            target={target}
          />
        ) : (
          <div className="calculate-page">
            <div className="constants">
              <div className="meal-constant">
                <Label>Meal weight (grams):</Label>
                <Input value={String(_weight)} type="number" onChange={(event, data) => setWeight(data.value)}/>
              </div>
              <div className="ratio-constant">
                <Label>Target ratio:</Label>
                <Input value={String(_target)} type="number"  onChange={onChangeTarget} step={0.1}/>
              </div>
            </div>
            <MealNutrition selectedFoods={selectedFoods} target={target} weight={weight}/>
            <div className="add-food-buttom">
              <Button onClick={() => setShowingPickerPage(true)}>Add more food</Button>
            </div>
            <SelectedLists
              selectedFoods={selectedFoods}
              target={target}
              weight={weight}
              onAdjust={(food, percentage) => setSelectedFoods(onAdjustSelectedFood(food, percentage, selectedFoods, target))}
              onRemove={(food) => setSelectedFoods(selectedFoods.filter(otherFood => otherFood.code !== food.code))}
            />
          </div>
        )}
      </div>
    </FluentProvider>
  );
}

export default App;
