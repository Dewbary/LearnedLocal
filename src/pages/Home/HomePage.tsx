import Link from "next/link";
import ExperienceCard from "~/components/FindExperience/ExperienceCard";
import { Experience } from "@prisma/client";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import Header from "~/components/Header";
import NavBar from "~/components/NavBar/NavBar";
import Footer from "~/components/Footer/Footer";

const HomePage = () => {
  const user = useUser();
  const uniqueSlug = uuidv4();
  const experiencesQuery = api.experience.getAll.useQuery();

  // Get all experiences owned by the user
  const { data: ownedExperiences, isLoading } =
    api.experience.byUserId.useQuery();

  return (
    <>
      <NavBar isSignedIn={user.isSignedIn ?? false} />

      <Header />

      {user.isSignedIn ? (
        <button className="btn-primary btn m-4">
          <Link href={`experience/create/${uniqueSlug}`}>
            Create an Experience
          </Link>
        </button>
      ) : null}

      <div>
        {ownedExperiences?.map((experience: Experience) => {
          return (
            <div key={experience.id}>
              <p>{experience.title}</p>
              <button className="btn-primary btn m-4">
                <Link
                  href={{
                    pathname: `experience/create/${experience.slugId}`,
                    query: { experienceId: experience.id },
                  }}
                >
                  Edit Experience
                </Link>
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {experiencesQuery.data?.map((experience: Experience) => (
          <div className="card-component my-8 flex justify-center">
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>

      <div>
        <button className="btn-primary btn m-4">
          <Link href={`/testcheckout/testcheckout`}>Test Checkout</Link>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
