import { useRef, useState } from "react";
import ReactSelect from "react-select";
import { SelectedFood } from "./App";
import { Data, getData } from "./data";
import { PickerPageSelectedFood } from "./PickerPageSelectedOption";
import { getColor } from "./utils";

interface DefaultFoodFormProps {
  onSelect: (food: Data | undefined) => void;
  selectedFoods: SelectedFood[];
  target: number;
}

const allData = getData()

const dataArray = Array.from(allData.values())
const _options = dataArray.sort((datumA, datumB) => {
  if (datumA.custom && !datumB.custom) return -1
  if (datumB.custom && !datumA.custom) return 1
  return datumA.name > datumB.name ? 1 : -1
}).map(datum => ({
  value: datum.code,
  label: datum.name
}))

export const DefaultFoodForm: React.FC<DefaultFoodFormProps> = props => {
  const { onSelect, target, selectedFoods } = props;
  const [selectedFood, setSelectedFood] = useState<Data | undefined>()

  const _onSelect = (food: Data | undefined) => {
    setSelectedFood(food);
    onSelect(food)
  }

  const options = useRef(_options.filter(option => {
    return selectedFoods.every(food => food.code !== option.value)
  }))

  return (
    <div className="default-picker-page">
      <ReactSelect
        isSearchable
        options={options.current}
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