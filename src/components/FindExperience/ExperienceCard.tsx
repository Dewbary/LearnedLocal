import Image from 'next/image'
import outdoors from '../../assets/outdoors.jpg'

interface Experience {
    title: string,
    content: string,
    price: number
}

export default function ExperienceCard ({experience}: {experience: Experience}) {
    return (
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
                <p>{experience.content}</p>
                <div className='absolute bottom-5 left-5'>
                    <p className='font-bold text-xl'>${experience.price}</p>
                </div>
                <div className='absolute bottom-3 right-3'>
                    <button className='bg-blue-500 p-2 text-white drop-shadow-md rounded-lg'>Details</button>
                </div>
            </div>
        </div>
    );
}

export type {Experience};