import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import { api } from "~/utils/api";
import styles from "./admin.module.css";

interface AdminUpdateValues {
  experienceId: number;
  verify: boolean;
  markFull: boolean;
  externalListing: boolean;
  externalListingLink: string | null;
  externalHostName: string | null;
}

export default function Admin() {
  const [allListings, setAllListings] = useState(
    [] as ExperienceInfo[] | undefined
  );
  const allListingsQuery = api.experience.getAllAdmin.useQuery();
  const administerExperienceMutation =
    api.experience.administerExperience.useMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAllListings(allListingsQuery.data);
  }, [allListingsQuery.data]);

  const handleUpdateExperience = async (values: AdminUpdateValues) => {
    setLoading(true);
    await administerExperienceMutation.mutateAsync({
      experienceId: values.experienceId,
      verify: values.verify,
      isFull: values.markFull,
      externalListing: values.externalListing,
      externalListingLink: values.externalListingLink,
      externalHostName: values.externalHostName,
    });
    setLoading(false);
    alert("Updated");
  };

  return (
    <div>
      <div
        className={`${styles.csstable ?? ""} border-2 ${
          loading ? "disabled opacity-80" : ""
        }`}
      >
        <div>
          <div>Title</div>
          <div>Host</div>
          <div>Description</div>
          <div>First Availability</div>
          <div>Verified?</div>
          <div>Mark as Full?</div>
          <div>External Listing?</div>
          <div>External Host Name</div>
          <div>External Listing Link</div>
          <div>Update</div>
        </div>
        {allListings?.map((listing) => (
          <Formik
            key={listing.id}
            initialValues={{
              experienceId: listing.id,
              verify: listing.verified,
              externalListing: listing.isExternalListing,
              externalListingLink: listing.externalListingLink,
              externalHostName: listing.externalHostName,
              markFull: listing.isFull,
            }}
            onSubmit={handleUpdateExperience}
          >
            <Form>
              <div>{listing.title}</div>
              <div>
                {listing.profile?.firstName} {listing.profile?.lastName}
              </div>
              <div>{listing.description}</div>
              <div>{listing.availability.at(0)?.startTime?.toDateString()}</div>
              <div>
                <Field name="verify" type="checkbox" />
              </div>
              <div>
                <Field name="markFull" type="checkbox" />
              </div>
              <div>
                <Field name="externalListing" type="checkbox" />
              </div>
              <div>
                <Field
                  name="externalHostName"
                  type="text"
                  className="rounded-md outline outline-1"
                />
              </div>
              <div>
                <Field
                  name="externalListingLink"
                  type="text"
                  className="rounded-md outline outline-1"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className=" rounded-lg bg-amber-400 px-3 py-1 hover:bg-amber-300"
                >
                  Update Experience
                </button>
              </div>
            </Form>
          </Formik>
        ))}
      </div>
    </div>
  );
}
