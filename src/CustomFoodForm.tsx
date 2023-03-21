import { Input, Label } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Data } from "./data";

interface CustomFoodFormProps {
  onSelect: (food: Data | undefined) => void;
}

enum Fields {
  name = "name",
  carbs = "carbs",
  fat = "fat",
  protein = "protein"
}

export const CustomFoodForm: React.FC<CustomFoodFormProps> = props => {
  const { onSelect } = props;

  const [name, setName] = useState<string>("")
  const [carbs, setCarbs] = useState<string>("")
  const [fat, setFat] = useState<string>("")
  const [protein, setProtein] = useState<string>("")

  const onChange = (field: Fields, value: string) => {
    switch (field) {
      case Fields.name: setName(value); break;
      case Fields.carbs: setCarbs(value); break;
      case Fields.fat: setFat(value); break;
      case Fields.protein: setProtein(value); break;
    }
  }
  
  useEffect(() => {
    if (name.length && carbs.length &&!isNaN(Number(carbs)) && fat.length &&!isNaN(Number(fat)) && protein.length &&!isNaN(Number(protein))) {
      onSelect({
        code: "custom-" + String(Math.random() * 100000),
        name,
        carbs: Number(carbs),
        fat: Number(fat),
        protein: Number(protein)
      })
    } else {
      onSelect(undefined)
    }

  }, [name, carbs, fat, protein])

  return (
    <div className="custom-form-page">
      <div className="custom-form-row">
        <div className="custom-form-cell">
          <Label htmlFor={Fields.name}>Name</Label>
          <Input id={Fields.name} onChange={(event, data) => onChange(Fields.name, data.value)}/>
        </div>
      </div>

      <div className="custom-form-row">
        <div className="custom-form-cell">
          <Label htmlFor={Fields.fat}>Fat</Label>
          <Input id={Fields.fat} onChange={(event, data) => onChange(Fields.fat, data.value)} type="number"/>
        </div>

        <div className="custom-form-cell">
          <Label htmlFor={Fields.protein}>Protein</Label>
          <Input id={Fields.protein} onChange={(event, data) => onChange(Fields.protein, data.value)} type="number"/>
        </div>

        <div className="custom-form-cell">
          <Label htmlFor={Fields.carbs}>Carbs</Label>
          <Input id={Fields.carbs} onChange={(event, data) => onChange(Fields.carbs, data.value)} type="number"/>
        </div>
      </div>
    </div>
  )
}