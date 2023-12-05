import { Calculator } from "./pages/Calculator"

type TextInputProps = {
    inputData: Calculator
}

const DisplayResult = (resultArray: string[]) => {

    const reversedResultArray = resultArray.slice().reverse();

    return (
        <div className="absolute max-h-40 overflow-auto w-32">
            <ul className="bg-inherit text-white text-left text-4xl pb-16 p-4">
                {reversedResultArray.map((item, index) => (
                    <ul key={index}> {item} </ul>
                ))}
            </ul>
        </div>
    )
}

export const TextInput: React.FC<TextInputProps> = ({ inputData }) => {

    const { display, resultArray, result } = inputData

    return (
        <div className="bg-greycustom flex-wrap h-60 w-300 p-4">
            {DisplayResult(resultArray)}
            <input type="text" className="text-right 
                text-white bg-inherit border-none 
                outline-none h-20 w-full p-4 mt-28 text-7xl 
                overflow-hidden placeholder:text-white" placeholder="0" value={display} readOnly />
        </div>

    )

}

