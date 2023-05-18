import { Experience } from "@prisma/client";

export default function ExperienceModalHeader({
  experience,
}: {
  experience: Experience;
}) {
  const dateDisplayOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  } as const;

  return (
    <div className="flex w-full flex-col justify-between lg:flex-row lg:items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl lg:text-4xl font-bold">{experience.title}</h1>
        <p>
          <span className="align-middle text-sm lg:text-md">Hosted By</span>
          <span className="inline-block">
            <img
              src={experience.profileImage ?? ""}
              alt="profile picture"
              className="inline w-5 rounded-full object-cover mx-2"
            />
            <span className="align-middle text-yellow-600 text-sm lg:text-md">
              {experience.firstName} {experience.lastName}
            </span>
          </span>
        </p>
      </div>
      <div className="flex">
        <h1 className="mr-3 text-lg lg:text-2xl">
          {experience.date.toLocaleDateString("en-US", dateDisplayOptions)}
        </h1>
      </div>
    </div>
  );
}
