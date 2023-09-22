import { CheckIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    label: string,
    savedValue: string,
    setSavedValue: Dispatch<SetStateAction<string>>
}

export default function SavingInputField({label, savedValue, setSavedValue}: Props) {

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
        <div className="flex flex-col w-fit">
                <div className="flex gap-3 items-end h-8">
                    <label className="font-bold text-slate-700">{label}</label>
                    <button 
                        className="bg-blue-400 p-1 rounded-md drop-shadow-md"
                        hidden={editModeActive}
                        onClick={() => handleEditButtonClick()}
                    >
                        <PencilSquareIcon className="w-5 text-white"/>
                    </button>
                </div>
                <div className="mt-1 h-10">
                    <p 
                        className="text-xl"
                        hidden={editModeActive}
                    >
                        {savedValue !== "" ? savedValue : "[missing]"}
                    </p>
                    <div className={`${editModeActive ? "flex" : "hidden"} flex items-center gap-2`}>
                        <input 
                            placeholder={label}
                            className="border-2 border-slate-500 rounded-md py-1 px-2"
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                        />
                        <button
                            className="bg-green-400 p-1 rounded-md drop-shadow-md"
                            onClick={() => handleMakeChangeButtonClick()}
                        >
                            <CheckIcon className="text-white w-7"/>
                        </button>
                        <button
                            className="bg-red-400 p-1 rounded-md drop-shadow-md"
                            onClick={() => handleCancelChangeButtonClick()}
                        >
                            <XMarkIcon className="text-white w-7"/>
                        </button>
                    </div>
                </div>
            </div>
    )
}