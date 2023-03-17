import { rawData } from "./rawdata";

export interface Data {
  code: string;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
}

const splitRawData = rawData.split("|")
const data: Map<string, Data> = new Map()
for (let index = 0; index < splitRawData.length - 1; index += 5) {
  const slice = splitRawData.slice(index, index + 5)
  const [code, name, proteinString, fatString, carbsString] = slice

  const datum: Data = {
    code,
    name,
    protein: Number(proteinString),
    fat: Number(fatString),
    carbs: Number(carbsString)
  }

  if (datum.code && datum.name && datum.protein && datum.fat && datum.carbs) {
    data.set(datum.code, datum)
  }
}

export default data

