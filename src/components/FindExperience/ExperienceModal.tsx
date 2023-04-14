import Image from 'next/image'
import outdoors from '../../assets/outdoors.jpg'

export default function ExperienceModal({ hideModal } : {hideModal: () => void}) {

    return (
        <div className="bg-white rounded-3xl w-2/3 h-5/6 relative">
            <div className="flex">
                <span className="inline-block p-3">
                    <h1 className="text-4xl font-bold">Event Title</h1>
                </span>
                <button type="button" onClick={hideModal} className="mr-5 h-9 place-self-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
            </div>
            <div className='h-96 overflow-hidden'>
                <Image src={outdoors} alt="Nice outdoor picture" className='w-full'/>
            </div>
            <div className='h-1/5 p-5'>
                <p>Here are some details about the event! You can take your friends and camp in the mountains.</p>
                <div className='absolute bottom-6 left-5 text-3xl font-bold'>$11</div>
                <button className='absolute bottom-5 right-5 bg-blue-500 text-white p-3 rounded-lg'>Sign Up</button>
            </div>
        </div>
    )
}