type Props = {
    deleteAccountAction: () => void;
}

export default function AdvancedSettings({deleteAccountAction}: Props) {
    return (
        <div className="flex flex-col gap-10 mx-3 lg:mx-0">
            <h1 className="text-3xl lg:text-4xl text-center lg:text-left">Advanced Settings</h1>
            <div className="flex flex-col gap-3">
                <button 
                    className="bg-red-400 w-fit px-3 py-2 rounded-lg text-white drop-shadow-md"
                    onClick={() => deleteAccountAction()}
                >
                    Delete Account
                </button>
                <p className="font-bold">Warning: deleting your account is an irreversible action!</p>
            </div>
        </div>
    )
}