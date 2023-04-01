import { Button, Radio, RadioGroup } from "@fluentui/react-components";
import { useState } from "react";
import { SelectedFood } from "./App";
import { CustomFoodForm } from "./CustomFoodForm";
import { Data } from "./data";
import { DefaultFoodForm } from "./DefaultFoodForm";
import { addToLocalStorage } from "./utils";

interface PickerPageProps {
  onAdd: (food: Data) => void;
  onClose: () => void;
  target: number;
  selectedFoods: SelectedFood[];
}

export const PickerPage: React.FC<PickerPageProps> = props => {
  const { onAdd, onClose, selectedFoods, target } = props;
  const [selectedFood, setSelectedFood] = useState<Data | undefined>()
  const [addDefault, setAddDefault] = useState<boolean>(true)

  const _onAdd = (food: Data) => {
    if (!addDefault && food) {
      console.log('adding')
      addToLocalStorage(food)
    }
    onAdd(food)
  }

  return (
    <div className="picker-page">
      <h3>Add a new food</h3>
      <RadioGroup
        className="food-picker-type"
        layout="horizontal"
        value={addDefault ? "default" : "custom"}
        onChange={(event, data) => {
          setAddDefault(data.value === "default")
          setSelectedFood(undefined)
        }}
      >
        <Radio value="default" label="Existing food"/>
        <Radio value="custom" label="New food"/>
      </RadioGroup>
      { addDefault ? (
        <DefaultFoodForm
          onSelect={setSelectedFood}
          target={target}
          selectedFoods={selectedFoods}
        />
      ) : (
        <CustomFoodForm onSelect={setSelectedFood}/>
      )}

      <div className="submit-buttons">
        <Button
          appearance="primary"
          disabled={!selectedFood}
          onClick={() => {
            if (selectedFood) {
              _onAdd(selectedFood);
            }
            onClose();
          }}
        >
          Add
        </Button>
        <Button onClick={() => onClose()}>
          Cancel
        </Button>
      </div>
    </div>
  )
}