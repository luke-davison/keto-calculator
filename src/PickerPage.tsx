import { Button } from "@fluentui/react-components";
import { useState } from "react";
import ReactSelect from "react-select";
import allData, { Data } from "./data";
import { PickerPageSelectedFood } from "./PickerPageSelectedOption";
import { getColor } from "./utils";

interface PickerPageProps {
  onAdd: (food: Data | undefined) => void;
  onClose: () => void;
  target: number;
}

const dataArray = Array.from(allData.values())
const options = dataArray.map(datum => ({
  value: datum.code,
  label: datum.name
})).sort((datumA, datumB) => {
  return datumA.label > datumB.label ? 1 : -1
})

export const PickerPage: React.FC<PickerPageProps> = props => {
  const { onAdd, onClose, target } = props;
  const [selectedFood, setSelectedFood] = useState<Data | undefined>()

  return (
    <div className="picker-page">
      <h3>Add a new food</h3>
      <ReactSelect
        isSearchable
        options={options}
        isClearable
        value={null}
        onChange={option => {
          if (option) {
            setSelectedFood(allData.get(option.value))
          } else {
            setSelectedFood(undefined)
          }
        }}
        styles={{
          option: (styles, { data }) => {
            if (!data) {
              return styles
            }

            const datum = allData.get(data.value)
            if (!datum) {
              return styles
            }
            
            return {
              ...styles,
              backgroundColor: getColor(datum, target)
            }
          }
        }}
      />

      <PickerPageSelectedFood selectedFood={selectedFood} target={target}/>

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