import { useState } from "react"
import { Buttons } from "../Button"
import { TextInput } from "../TextInput"

export type Calculator = {
  display: string
  result: string
  firstValue: string
  isWaitingSecondValue: boolean
  operator: string
  resultArray: string[]
  isCalculated: boolean
}

const initialState: Calculator = {
  display: '',
  result: '',
  firstValue: '',
  isWaitingSecondValue: false,
  operator: '',
  resultArray: [],
  isCalculated: false
}

export const Calculator: React.FC = () => {

  const [inputData, setInputData] = useState<Calculator>(initialState)

  return (
    <div className="min-h-screen flex-col flex justify-center items-center ">
      <TextInput inputData={inputData} ></TextInput>
      <Buttons inputData={inputData} setInputData={setInputData} ></Buttons>
    </div>
  )
}