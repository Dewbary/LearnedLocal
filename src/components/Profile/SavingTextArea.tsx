import { CheckIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    label: string,
    savedValue: string,
    setSavedValue: Dispatch<SetStateAction<string>>,
}

export default function SavingTextArea({label, savedValue, setSavedValue}: Props) {

    const [editModeActive, setEditModeActive] = useState(false);
    const [newValue, setNewValue] = useState(savedValue);
    
    const handleEditButtonClick = function () {
        setEditModeActive(true);
    }

    const handleMakeChangeButtonClick = function () {
        setEditModeActive(false);
        setSavedValue(newValue);
    }

    const handleCancelChangeButtonClick = function () {
        setEditModeActive(false);
        setNewValue(savedValue);
    }
    
    return (
        <div className="flex flex-col w-fit lg:w-1/2">
                <div className="flex gap-3 items-end h-8">
                    <label className="font-bold text-slate-700">{label}</label>
                    <button 
                        className="bg-blue-400 p-1 rounded-md drop-shadow-md"
                        hidden={editModeActive}
                        onClick={() => handleEditButtonClick()}
                    >
                        <PencilSquareIcon className="w-5 text-white"/>
                    </button>
                    <button
                        className="bg-green-400 p-1 rounded-md drop-shadow-md"
                        hidden={!editModeActive}
                        onClick={() => handleMakeChangeButtonClick()}
                    >
                        <CheckIcon className="text-white w-5"/>
                    </button>
                    <button
                        className="bg-red-400 p-1 rounded-md drop-shadow-md"
                        hidden={!editModeActive}
                        onClick={() => handleCancelChangeButtonClick()}
                    >
                        <XMarkIcon className="text-white w-5"/>
                    </button>
                </div>
                <div className="mt-2">
                    <p 
                        className="text-md"
                        hidden={editModeActive}
                    >
                        {savedValue}
                    </p>
                    <div className={`${editModeActive ? "flex" : "hidden"} flex items-center gap-2`}>
                        <textarea
                            placeholder={label}
                            className="border-2 border-slate-500 rounded-md py-1 px-2 w-72 lg:w-full"
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                        />
                        
                    </div>
                </div>
            </div>
    )
}