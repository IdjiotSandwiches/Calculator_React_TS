import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Calculator } from "./pages/Calculator"

type ButtonType = {
    type?: 'number' | 'operator' | 'calc' | 'clear' | 'del' | 'support'
    value?: string
    children?: string
    inputData: Calculator
    setInputData: React.Dispatch<React.SetStateAction<Calculator>>
}

const Button: React.FC<ButtonType> = ({ type, value, children, inputData, setInputData }) => {

    const { display, firstValue, result, isWaitingSecondValue, operator, resultArray } = inputData

    const nav = useNavigate()

    const background = () => {
        switch(type) {
            case 'operator':
                return 'rgb(256,156,12)'
            case 'calc':
                return 'rgb(256,156,12)'
            case 'support':
                return 'rgba(134,98,66,255)'
            default:
                return 'grey'
        }
    }

    const styles: React.CSSProperties = {
        background: background(),
        color: 'white',
        borderStyle: 'none',
        borderRadius: '15rem',
        height: '5rem',
        width: children == '0' || children == '=' ? '12.5rem' : '5rem',
        fontSize: '2rem'
    }

    // Calculate Value
    const calculate = (display: string) => {
        let calc: number
        if(operator === '/') {
            calc = parseFloat(firstValue) / parseFloat(display)
            if(calc === Infinity || calc === Number.NEGATIVE_INFINITY || isNaN(calc)) 
                return 'Err'
            return calc.toString()
        }
        if(operator === 'X') {
            return (parseFloat(firstValue) * parseFloat(display)).toString()
        }
        if(operator === '-') {
            return (parseFloat(firstValue) - parseFloat(display)).toString()
        }
        if(operator === '+') {
            return (parseFloat(firstValue) + parseFloat(display)).toString()
        }
        return 'Err'
    }

    const handleClick = () => {
        switch(type) {
            case 'support': {
                {nav('/support')}
                break
            }
            case 'number': {
                if(isWaitingSecondValue === false && operator === '' && display !== 'Err') {
                    if(display === '' && children === '0') {
                        // Tombol '0' tidak dapat ditekan jika display === ''
                        return
                    }
                    else {
                        setInputData({...inputData, 
                            display: display + children
                        })
                    }
                }
                else if (isWaitingSecondValue === true && operator !== '') {
                    if(display === operator && children) {
                        setInputData({...inputData, 
                            display: children
                        })
                    }
                    else if(display === '' && children === '0') {
                        // Jika display === '0' maka angka tidak dapat ditekan
                        return
                    }
                    else {
                        setInputData({...inputData, 
                            display: display + children
                        })
                    }
                }
                else if(display === 'Err' && children) {
                    setInputData({...inputData, 
                        display: children
                    })
                }
                break
            }
            case 'operator': {

                if(display === 'Err') {
                    return
                    // Kalau display === 'Err', operator tidak dapat ditekan
                }
                // Kalo firstvalue udh ada, hbs tuh pencet operator, isWaitingSecondValue: true, nanti malah ke calculate malah hrsny second value msh kosong
                else if(isWaitingSecondValue === false && value) {
                    if(display === '') {
                        setInputData({...inputData, 
                            isWaitingSecondValue: true, 
                            firstValue: '0', 
                            operator: value, 
                            display: value
                        })
                    }

                    else {
                        setInputData({...inputData, 
                            isWaitingSecondValue: true, 
                            firstValue: display, 
                            operator: value, 
                            display: value
                        })
                    }
                }
                else if(isWaitingSecondValue === true && value) {
                    // kalkulasi kalau display === operator, kalo display !== operator maka firstValue & result = firstValue
                    if(display === 'X' || display === '/' || display === '+' || display === '-') {
                        setInputData({...inputData, operator: value, display: value})
                    }
                    else {
                        if(display !== '') {
                            let calc = calculate(display)
                            if(calc !== 'Err') {
                                setInputData({...inputData, 
                                    firstValue: display !== operator ? calc : firstValue, 
                                    result: display !== operator ? calc : firstValue, 
                                    operator: value, 
                                    display: value
                                })
                            }
                            else {
                                setInputData({...inputData, 
                                    firstValue: '', 
                                    result: '', 
                                    operator: '', 
                                    display: calc, 
                                    isWaitingSecondValue: false
                                })
                            }
                        }
                    }
                }

                break
            }
            case 'del': {
                if(display.length === 1 && display !== 'X' && display !== '/' && display !== '+' && display !== '-') {
                    setInputData({...inputData, 
                        display: ''
                    })
                }
                else if(display === result && display !== 'X' && display !== '/' && display !== '+' && display !== '-') {
                    setInputData({...inputData, 
                        display: '', 
                        operator: ''
                    })
                }
                else if(display !== 'X' && display !== '/' && display !== '+' && display !== '-') {
                    setInputData({...inputData, 
                        display: display.slice(0, -1)
                    })
                }
                break
            }
            case 'clear': {
                setInputData({...inputData, 
                    display: '', 
                    firstValue: '', 
                    operator: '', 
                    isWaitingSecondValue: false
                })
                break
            }
            case 'calc': {
                let calc = calculate(display)
                if(display !== 'X' && display !== '/' && display !== '+' && display !== '-' && display !== '') {
                    if(isWaitingSecondValue === true && display !== 'operator' && calc !== 'Err') {
                        setInputData({...inputData, 
                            firstValue: display !== operator ? calc : firstValue, 
                            result: display !== operator ? calc : firstValue, 
                            display: display !== operator ? calc : firstValue, 
                            isWaitingSecondValue: false
                        })
                    }
                    else if(isWaitingSecondValue === false) {
                        // Kosong biar tidak dapat dipencet
                        return
                    }
                    else {
                        setInputData({...inputData, 
                            firstValue: '', 
                            result: '', 
                            operator: '', 
                            display: calc, 
                            isWaitingSecondValue: false
                        })
                    }
                }
                break
            }
        }
    }

    // Untuk update array hasil
    useEffect(() => {
        let arr = [...resultArray]
        
        if(result !== '' && result !== 'Err') {
            arr.push(result)
            setInputData({...inputData, 
                resultArray: arr
            })
        }

        return () => {
            
        }

    }, [result])

    return (
        <button style={styles} onClick={() => handleClick()} > {children} </button>
    )
}

export const Buttons: React.FC<ButtonType> = ({ inputData, setInputData }) => {

    return (
        <div className="flex flex-col bg-black h-320 w-300 justify-end items-center">
            <div className="flex">
                <div className="grid grid-cols-3 gap-x-8 gap-y-4 justify-center items-center">
                    <Button inputData={inputData} setInputData={setInputData} type="clear" >C</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="del" >DEL</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="support"  >?</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >1</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >2</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >3</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >4</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >5</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >6</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >7</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >8</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="number" >9</Button>
                </div>
                <div className="grid grid-cols-1 gap-4 justify-center items-center pl-16">
                    <Button inputData={inputData} setInputData={setInputData} type="operator" value="/" >/</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="operator" value="X" >X</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="operator" value="-" >-</Button>
                    <Button inputData={inputData} setInputData={setInputData} type="operator" value="+" >+</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-12 p-4">
                <Button inputData={inputData} setInputData={setInputData} type="number" >0</Button>
                <Button inputData={inputData} setInputData={setInputData} type="calc" >=</Button>
            </div>
        </div>
    )

}