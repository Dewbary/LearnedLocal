import Image from 'next/image'
import outdoors from '../../assets/outdoors.jpg'
import ExperienceModal from './ExperienceModal';
import { useState } from 'react';
import styles from "./ExperienceCard.module.css"
import { Experience } from '@prisma/client';

export default function ExperienceCard ({experience}: {experience: Experience}) {

    const [modalHidden, setModalHidden] = useState(true);

    const showModal = function () {
        setModalHidden(false);
    }

    const hideModal = function () {
        setModalHidden(true);
    }

    return (
        <>
        <div className="h-96 w-72 drop-shadow-xl rounded-2xl">
            <div className='absolute top-0 left-0 h-96 w-full'>
                <Image src={outdoors} alt="Picture of the outdoors" fill className='z-0 absolute rounded-2xl'/>
            </div>
            <div className='absolute top-3 right-3'>
                <h2 className='text-4xl text-white font-bold'>JUN 01</h2>
            </div>
            <div className='absolute h-56 w-full'>
                <div className='absolute bottom-0 left-3 w-auto'>
                    <h2 className='text-2xl text-white font-bold'>{experience.title}</h2>
                </div>
            </div>
            <div className='absolute bottom-0 w-full bg-white rounded-b-2xl h-36 p-3'>
                <p>{experience.description}</p>
                <div className='absolute bottom-5 left-5'>
                    <p className='font-bold text-xl'>${experience.price}</p>
                </div>
                <div className='absolute bottom-3 right-3'>
                    <button className='bg-blue-500 p-2 text-white drop-shadow-md rounded-lg' onClick={() => showModal()}>Details</button>
                </div>
            </div>
        </div>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40 ${modalHidden ? styles['modal-hidden'] : styles['modal-visible']}`}>
            <div className='flex justify-center items-center h-full w-full'>
                <ExperienceModal hideModal={hideModal}/>
            </div>
        </div>
        </>
    );
}

export type {Experience};