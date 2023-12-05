import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import baseUrl from "../Index"

type InputData = {
    firstName: string 
    lastName: string
    email: string
    topic: 'General' | 'Bug' | null
    description?: string
}

const initialState: InputData = {
    firstName: '',
    lastName: '',
    email: '',
    topic: null,
    description: ''
}

const Pages = () => {

    const random = () => {
        return Math.round(Math.random() * (Math.floor(9999) - Math.ceil(1000)) + Math.ceil(1000))
    }

    return (
        <div className="flex justify-center items-center absolute top-1/2 right-0 left-0">
            <div className="flex-col items-center justify-center">
                <div className="w-full flex justify-center pb-4">
                    <h1 className="text-orange-400 text-3xl w-4/5 font-bold text-center">Thank you for sending us your report, we will track the problem now</h1>
                </div>
                
                <div className="text-greycustom text-xl flex items-center justify-center font-normal">
                    ticket number: 
                    <span className="text-white text-2xl pl-2">{random()}</span>
                </div>
            </div>
        </div>
    )
}

const SupportPages = ({ setShowPages }: {setShowPages: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [inputData, setInputData] = useState<InputData>(initialState)
    const { firstName, lastName, email, topic, description } = inputData

    const [isDisable, setIsDisable] = useState<boolean>(true)

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = (email: string): boolean => {
        return emailRegex.test(email);
    };

    // Cek kalau required field sudah terisi
    useEffect(() => {
        if(firstName !== '' && lastName !== '' && email !== '' && topic) {
            setIsDisable(false)
        }
        return () => {
            setIsDisable(true)
        }
    }, [firstName, lastName, email, topic])

    const doSubmit =  () => {
        if(firstName === '' || lastName === '' || email === '' || !topic) {
            toast.error('Please fill all required field')
            return
        }
        else {
            if(!isValidEmail(email)) {
                toast.error('Email invalid')
                return
            }    
        }

        const user = {
            user_name: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            topic: topic,
            description: description
        }

        // Disable button saat request
        setIsDisable(true)

        setTimeout(() => {

            axios.post(baseUrl + 'user', user)
            .then(res => {
                toast.success('Submit Success')
                setInputData(initialState)
                setShowPages(true)
            })
            .catch(error => {
                toast.error('Submit Failed')
                setInputData(initialState)
                setIsDisable(false)
            })
        }, 2000)
        
    }

    return (
        <>
            <div className="flex justify-between">
                <div className="flex flex-col w-1/2">

                    {/* Name */}
                    <div className="p-2">
                        <h2 className="font-normal mt-8 mb-4 ">Name<span className="text-red-600 p-2 text-2xl">*</span></h2>
                        <div className="flex">

                            {/* First Name */}
                            <div className="flex flex-col pr-3">
                                <input type="text" id="first-name" className="focus:outline-orange-400 bg-black border-white border-2 rounded-lg h-8 w-80 px-2 text-base" value={firstName} onChange={(e) => {setInputData({...inputData, firstName: e.target.value})}}/>
                                <label htmlFor="first-name" className="px-0.5">First</label>
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col pr-3">
                                <input type="text" id="last-name" className="focus:outline-orange-400 bg-black border-white border-2 rounded-lg h-8 w-80 px-2 text-base" value={lastName} onChange={(e) => {setInputData({...inputData, lastName: e.target.value})}}/>
                                <label htmlFor="last-name" className="px-1"> Last</label>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="px-2">
                        <h2 className="font-normal mt-8 mb-4 pb-2">Email<span className="text-red-600 p-2 text-2xl">*</span></h2>
                        <input type="email" id="email" className="w-full px-2 h-8 text-base focus:outline-orange-400 bg-black border-white border-2 rounded-lg" value={email} onChange={(e) => {setInputData({...inputData, email: e.target.value})}}/>
                    </div>

                    {/* Topic */}
                    <div className="px-2">
                        <h2 className="font-normal mt-8 mb-4 pb-2">Topic<span className="text-red-600 p-2 text-2xl">*</span></h2>
                        <div className="border-dashed border-2 rounded-lg p-8 w-full">
                            <div className="font-medium mb-4">
                                <h3 className="mb-4">What can we help you today?</h3>

                                {/* General */}
                                <div className="flex align-middle">
                                    <input type="radio" name="topic" id="general" checked={topic === 'General'} onChange={(e) => {
                                        setInputData({...inputData, 
                                            topic: 'General'
                                        })
                                    }} />
                                    <label htmlFor="general" className="px-4">General</label>
                                </div>

                                {/* Bug */}
                                <div className="flex align-middle">
                                    <input type="radio" name="topic" id="bug" checked={topic === 'Bug'} onChange={(e) => {
                                        setInputData({...inputData, 
                                            topic: 'Bug'
                                        })
                                    }} />
                                    <label htmlFor="bug" className="px-4">Bug</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col w-400 pt-4">
                    <h2 className="font-normal mt-8 mb-4">Description<span className="text-gray-500 font-light text-sm pl-2">optional</span></h2>
                    <textarea name="description" id="description" className="placeholder:text-white focus:outline-orange-400 resize-none h-277 w-full text-base border-white bg-black p-4 border-2" placeholder="Description Report" value={description} onChange={(e) => {setInputData({...inputData, description: e.target.value})}}/>
                </div>
            </div>

            {/* Send Button */}
            <button onClick={() => {doSubmit()}} 
                    disabled={isDisable} 
                    className={`absolute w-40 h-16 rounded-full text-3xl right-20 bottom-16 ${isDisable ? 'bg-gray-500' : ' bg-orange-400'}`} >SEND</button>
        </>
    )
}

export const Support: React.FC = () => {

    // Untuk cek kalau kondisi apakah form diisi sudah benar dan berhasil ter-input
    const [showPages, setShowPages] = useState<boolean>(false)

    return (
        <div className="bg-black text-white flex-col min-h-screen px-20 pt-14">
            <Toaster toastOptions={{
                classNames: {
                    error: '!bg-red-400 !text-white',
                    success: '!text-green-400'
                }
            }} position='top-right'/>
            <h1 className="text-4xl font-medium border-b-2 border-gray-400 pb-6 ">Support Ticket Form</h1>

            {showPages ? <Pages /> : <SupportPages setShowPages={setShowPages} />}
        </div>
    )
}