
type GenericModalProps = {
    hideModal: () => void;
    modalHeaderContent: JSX.Element;
    modalContent: JSX.Element;
}

export default function GenericModal({ hideModal, modalHeaderContent, modalContent }: GenericModalProps) {

    return (
        <div className='bg-white w-full lg:w-2/3 h-full lg:h-5/6 lg:rounded-3xl relative flex flex-col'>

            {/* TOP BAR */}
            <div className='lg:rounded-t-3xl py-4 pr-6 pl-10 shadow-lg flex flex-row justify-between items-center bg-gradient-to-r from-amber-400 via-amber-200 to-white'>
                {modalHeaderContent}
                <button type="button" onClick={() => hideModal()} className="h-9 place-self-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                            </path>
                        </svg>
                </button>
            </div>

            {modalContent}

        </div>
    );
}