import { Experience } from '@prisma/client';
import Image from 'next/image';
import profile_pic from '../../assets/profile_pic.png';

export default function ExperienceModalHeader({experience} : {experience: Experience}) {

    const dateDisplayOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    } as const;

    return (
        <div className='flex flex-col lg:flex-row justify-between lg:items-center w-full'>
            <div className='flex flex-col'>
                <h1 className='text-4xl font-bold'>{experience.title}</h1>
                <p>
                    <span className='align-middle'>Hosted By</span>
                    <span className='inline-block'>
                        <Image src={profile_pic} alt="profile pic" className='w-5 inline lg:mx-2'/> 
                        <span className='align-middle text-yellow-600'>{experience.firstName} {experience.lastName}</span> 
                    </span>
                </p>
            </div>
            <div className='flex'>
                <h1 className='text-2xl mr-3'>{experience.date.toLocaleDateString("en-US", dateDisplayOptions)}</h1>
            </div>
        </div>
    )
}