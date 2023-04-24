import Image, { StaticImageData } from 'next/image'
import outdoors2 from '../../assets/outdoors-2.png'
import outdoors from '../../assets/outdoors.jpg'
import profile_pic from '../../assets/profile_pic.png'
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/solid'
import { Experience } from '@prisma/client'
import { useState } from 'react'
import { ModalActionButton } from './ExperienceCard'

export interface ExperienceModalProps {
    hideModal: () => void;
    experience: Experience;
    modalActionButton?: ModalActionButton;
}

export default function ExperienceModal({experienceModalProps} : {experienceModalProps: ExperienceModalProps}) {

    const dateDisplayOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    } as const;

    const [activeImage, setActiveImage] = useState(outdoors);

    const handleClickImage = function (image: StaticImageData) {
        setActiveImage(image);
    }

    return (
        <div className='bg-white w-full lg:w-2/3 h-full lg:h-5/6 lg:rounded-3xl relative flex flex-col'>

            {/* TOP BAR */}
            <div className='lg:rounded-t-3xl py-4 pr-6 pl-10 shadow-lg flex flex-row justify-between items-center bg-gradient-to-r from-amber-400 via-amber-200 to-white'>
                <div className='flex flex-col lg:flex-row justify-between lg:items-center w-full'>
                    <div className='flex flex-col'>
                        <h1 className='text-4xl font-bold'>{experienceModalProps.experience.title}</h1>
                        <p>
                            <span className='align-middle'>Hosted By</span>
                            <span className='inline-block'>
                                <Image src={profile_pic} alt="profile pic" className='w-5 inline lg:mx-2'/> 
                                <span className='align-middle text-yellow-600'>{experienceModalProps.experience.firstName} {experienceModalProps.experience.lastName}</span> 
                            </span>
                        </p>
                    </div>
                    <div className='flex'>
                        <h1 className='text-2xl mr-3'>{experienceModalProps.experience.date.toLocaleDateString("en-US", dateDisplayOptions)}</h1>
                    </div>
                </div>
                <button type="button" onClick={() => experienceModalProps.hideModal()} className="h-9 place-self-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                            </path>
                        </svg>
                </button>
            </div>

            {/* MAIN SCROLLABLE CONTENT */}
            <div className='flex flex-grow overflow-y-scroll'>
                <div className='basis-full'>

                    {/* IMAGES PORTION */}
                    <div className='m-10 grid grid-cols-4 gap-4'>
                        <div className='overflow-hidden max-h-60 col-span-4 lg:col-span-2 lg:row-span-2 lg:rounded-l-3xl'>
                            <Image src={activeImage} alt="outdoors"/>
                        </div>
                        <div className='overflow-hidden max-h-28'>
                            <Image src={outdoors} alt="outdoors" onClick={() => handleClickImage(outdoors)}/>
                        </div>
                        <div className='overflow-hidden max-h-28 lg:rounded-tr-3xl'>
                            <Image src={outdoors2} alt="outdoors" onClick={() => handleClickImage(outdoors2)}/>
                        </div>
                        <div className='overflow-hidden max-h-28'>
                            <Image src={outdoors2} alt="outdoors" onClick={() => handleClickImage(outdoors2)}/>
                        </div>
                        <div className='overflow-hidden max-h-28 lg:rounded-br-3xl'>
                            <Image src={outdoors2} alt="outdoors" onClick={() => handleClickImage(outdoors2)}/>
                        </div>
                    </div>

                    {/* DESCRIPTION PORTION */}
                    <div className='mx-10 flex flex-col lg:flex-row'>
                        <div className='basis-2/3 mr-3 lg:order-0 order-2'>
                            <h3 className='text-xl font-bold'>Description</h3>
                            <p>{experienceModalProps.experience.description}</p>
                            <br />
                            <h3 className='text-xl font-bold'>Details</h3>
                            <ul>
                                <li>{experienceModalProps.experience.guestRequirements}</li>
                                <li>{experienceModalProps.experience.provided}</li>
                                <li>{experienceModalProps.experience.activityLevel}</li>
                                <li>{experienceModalProps.experience.skillLevel}</li>
                            </ul>
                            <br />
                            <h3 className='text-xl font-bold'>Itinerary</h3>
                            <p>{experienceModalProps.experience.timeline}</p>
                            <br />
                            <h3 className='text-xl font-bold'>Location Notes</h3>
                            <p>{experienceModalProps.experience.locationDescription}</p>
                            <br />
                            <br />
                        </div>
                        <div className="lg:order-2 grid grid-cols-5 basis-1/3 items-center pb-5 mb-5 border-b-2 lg:border-b-0 lg:border-l-2 lg:pl-5 h-full gap-y-3">
                            <ClockIcon className='w-5'/> <span className='col-span-4'>{experienceModalProps.experience.startTime} - {experienceModalProps.experience.endTime}</span>
                            <MapPinIcon className='w-5'/> <span className='col-span-4'>{experienceModalProps.experience.location?.toString()}</span>
                            <CalendarIcon className='w-5'/> <span className='col-span-4'>{experienceModalProps.experience.date.toLocaleDateString("en-US", dateDisplayOptions)}</span>
                            <UserIcon className='w-5'/> <span className='col-span-4'>Ages {experienceModalProps.experience.minAge}+</span>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className='py-4 pl-10 pr-6 flex justify-between items-center border-t'>
                <div className='text-3xl font-bold'>${experienceModalProps.experience.price}</div>
                <div className=''>
                    <UserIcon className='w-5 inline border border-black rounded-full mr-2'/>
                    <span>9/{experienceModalProps.experience.maxAttendees} Spots Filled</span></div>
                {experienceModalProps.modalActionButton ? (
                    <>
                        <button 
                            className={`${experienceModalProps.modalActionButton.buttonColor} text-white p-3 rounded-lg`}
                            onClick={() => experienceModalProps.modalActionButton?.buttonAction()}
                        >
                            {experienceModalProps.modalActionButton.buttonText}
                        </button>
                    </>
                ) : (
                    <button 
                        className='bg-amber-400 text-white p-3 rounded-lg'
                        onClick={() => experienceModalProps.hideModal()}
                    >
                        Close
                    </button>
                )}
                
            </div>
        </div>
    )
}