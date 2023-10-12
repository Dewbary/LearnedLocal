import { useState } from "react";

type Props = {
    modalId: string;
    experienceTitle: string | null;
    handleRemindClick: (newContactEmail: string) => void;
    handleCloseClick: () => void;
}

export default function PostFavoriteEmailCollector (props: Props) {

    const [newContactEmail, setNewContactEmail] = useState("");

    const handleRemindClick = () => {
        props.handleRemindClick(newContactEmail);
    }

    return (
        <dialog id={props.modalId} className="bg-transparent">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={props.handleCloseClick}>✕</button>
                </form>
                <div className="text-center flex flex-col gap-3">
                    <h1 className="font-bold text-xl">Want a reminder?</h1>
                    <p>We&apos;ll remind you to check your calendar later and sign up for {props.experienceTitle}! Just enter your email below.</p>
                    <div className="flex flex-col md:flex-row w-full gap-2">
                        <input type="email" placeholder="joe.test@example.com" className="border border-slate-600 p-2 rounded-md flex-grow" onChange={e => setNewContactEmail(e.target.value)}/>
                        <form method="dialog" className="flex flex-col">
                            <button 
                                className="bg-amber-400 py-3 md:py-0 rounded-lg shadow-md text-white px-3 hover:bg-amber-300 flex-grow" 
                                onClick={() => handleRemindClick()}
                            >
                                Remind Me!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}