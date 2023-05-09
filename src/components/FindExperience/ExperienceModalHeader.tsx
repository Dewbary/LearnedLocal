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
        <h1 className="text-4xl font-bold">{experience.title}</h1>
        <p>
          <span className="align-middle">Hosted By</span>
          <span className="inline-block">
            <img
              src={experience.profileImage ?? ""}
              alt="profile picture"
              className="inline w-5 rounded-full object-cover lg:mx-2"
            />
            <span className="align-middle text-yellow-600">
              {experience.firstName} {experience.lastName}
            </span>
          </span>
        </p>
      </div>
      <div className="flex">
        <h1 className="mr-3 text-2xl">
          {experience.date.toLocaleDateString("en-US", dateDisplayOptions)}
        </h1>
      </div>
    </div>
  );
}
