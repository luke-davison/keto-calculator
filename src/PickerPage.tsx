import { Button, Radio, RadioGroup } from "@fluentui/react-components";
import { useState } from "react";
import { CustomFoodForm } from "./CustomFoodForm";
import { Data } from "./data";
import { DefaultFoodForm } from "./DefaultFoodForm";

interface PickerPageProps {
  onAdd: (food: Data | undefined) => void;
  onClose: () => void;
  target: number;
}

export const PickerPage: React.FC<PickerPageProps> = props => {
  const { onAdd, onClose, target } = props;
  const [selectedFood, setSelectedFood] = useState<Data | undefined>()
  const [addDefault, setAddDefault] = useState<boolean>(true)

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
        />
      ) : (
        <CustomFoodForm
          onSelect={setSelectedFood}
          target={target}
        />
      )}

      <div className="submit-buttons">
        <Button
          appearance="primary"
          disabled={!selectedFood}
          onClick={() => {
            if (selectedFood) {
              onAdd(selectedFood);
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