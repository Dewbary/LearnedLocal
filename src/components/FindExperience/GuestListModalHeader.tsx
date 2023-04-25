import { Experience } from "@prisma/client";

export default function GuestListModalHeader({experience}: {experience: Experience}) {
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{experience.title}</h1>
            <h2>Manage Guest List</h2>
        </div>
    )
}