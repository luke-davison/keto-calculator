import { useState } from "react";
import ReactSelect from "react-select";
import allData, { Data } from "./data";
import { PickerPageSelectedFood } from "./PickerPageSelectedOption";
import { getColor } from "./utils";

interface DefaultFoodFormProps {
  onSelect: (food: Data | undefined) => void;
  target: number;
}

const dataArray = Array.from(allData.values())
const options = dataArray.map(datum => ({
  value: datum.code,
  label: datum.name
})).sort((datumA, datumB) => {
  return datumA.label > datumB.label ? 1 : -1
})

export const DefaultFoodForm: React.FC<DefaultFoodFormProps> = props => {
  const { onSelect, target } = props;
  const [selectedFood, setSelectedFood] = useState<Data | undefined>()

  const _onSelect = (food: Data | undefined) => {
    setSelectedFood(food);
    onSelect(food)
  }

  return (
    <div className="default-picker-page">
      <ReactSelect
        isSearchable
        options={options}
        isClearable
        value={null}
        onChange={option => {
          if (option) {
            _onSelect(allData.get(option.value))
          } else {
            _onSelect(undefined)
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
    </div>
  )
}