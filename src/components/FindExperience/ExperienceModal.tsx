import Image from 'next/image'
import outdoors2 from '../../assets/outdoors-2.png'
import profile_pic from '../../assets/profile_pic.png'
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/solid'
import { Experience } from '@prisma/client'

export default function ExperienceModal({ hideModal, experience } : {hideModal: () => void, experience: Experience}) {

    const dateDisplayOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    } as const;

    return (
        <div className='bg-white rounded-3xl w-2/3 h-5/6 relative flex flex-col'>

            {/* TOP BAR */}
            <div className=' rounded-t-3xl py-4 pr-6 pl-10 shadow-lg flex justify-between items-center bg-gradient-to-r from-amber-400 via-amber-200 to-white'>
                <div>
                    <h1 className='text-4xl font-bold'>{experience.title}</h1>
                    <p><span className='align-middle'>Hosted By</span>
                    <span className='inline-block'>
                        <Image src={profile_pic} alt="profile pic" className='w-5 inline mx-2'/> 
                        <span className='align-middle text-yellow-600'>{experience.firstName} {experience.lastName}</span> 
                    </span>
                    </p>
                </div>
                <div className='flex'>
                    <h1 className='text-2xl mr-3'>{experience.date.toLocaleDateString("en-US", dateDisplayOptions)}</h1>
                    <button type="button" onClick={hideModal} className="h-9 place-self-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
                </div>
            </div>

            {/* MAIN SCROLLABLE CONTENT */}
            <div className='flex flex-grow overflow-y-scroll'>
                <div className='basis-full'>

                    {/* IMAGES PORTION */}
                    <div className='m-10 h-56 flex'>
                        <div className='w-1/2 overflow-hidden h-full rounded-l-3xl mr-3'>
                            <Image src={outdoors2} alt="outdoors" className='' />
                        </div>
                        <div className='w-1/2 h-full grid grid-cols-2 gap-4'>
                                <div className='overflow-hidden'>
                                    <Image src={outdoors2} alt="outdoors"/>
                                </div>
                                <div className='overflow-hidden rounded-tr-3xl'>
                                    <Image src={outdoors2} alt="outdoors"/>
                                </div>
                                <div className='overflow-hidden'>
                                    <Image src={outdoors2} alt="outdoors"/>
                                </div>
                                <div className='overflow-hidden rounded-br-3xl'>
                                    <Image src={outdoors2} alt="outdoors"/>
                                </div>
                        </div>
                    </div>

                    {/* DESCRIPTION PORTION */}
                    <div className='mx-10 flex'>
                        <div className='basis-2/3 mr-3'>
                            <h3 className='text-xl font-bold'>Description</h3>
                            <p>{experience.description}</p>
                            <br />
                            <h3 className='text-xl font-bold'>Details</h3>
                            <ul>
                                <li>{experience.guestRequirements}</li>
                                <li>{experience.provided}</li>
                                <li>{experience.activityLevel}</li>
                                <li>{experience.skillLevel}</li>
                            </ul>
                            <br />
                            <h3 className='text-xl font-bold'>Itinerary</h3>
                            <p>{experience.timeline}</p>
                            <br />
                            <h3 className='text-xl font-bold'>Location Notes</h3>
                            <p>{experience.locationDescription}</p>
                            <br />
                            <br />
                        </div>
                        <div className="grid grid-cols-5 basis-1/3 items-center border-l-2 pl-5 h-full gap-y-3">
                            <ClockIcon className='w-5'/> <span className='col-span-4'>{experience.startTime} - {experience.endTime}</span>
                            <MapPinIcon className='w-5'/> <span className='col-span-4'>{experience.location?.toString()}</span>
                            <CalendarIcon className='w-5'/> <span className='col-span-4'>{experience.date.toLocaleDateString("en-US", dateDisplayOptions)}</span>
                            <UserIcon className='w-5'/> <span className='col-span-4'>Ages {experience.minAge}+</span>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className='py-4 pl-10 pr-6 flex justify-between items-center border-t'>
                <div className='text-3xl font-bold'>${experience.price}</div>
                <div className=''>
                    <UserIcon className='w-5 inline border border-black rounded-full mr-2'/>
                    <span>9/{experience.maxAttendees} Spots Filled</span></div>
                <button className='bg-amber-400 text-white p-3 rounded-lg'>SIGN UP</button>
            </div>
        </div>
    )
}