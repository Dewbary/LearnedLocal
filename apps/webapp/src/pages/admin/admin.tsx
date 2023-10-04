import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ExperienceInfo } from "~/components/types";
import { api } from "~/utils/api";
import styles from "./admin.module.css";

interface AdminUpdateValues {
    experienceId: number;
    verify: boolean;
    externalListing: boolean;
    externalListingLink: string | null;
    externalHostName: string | null;
}

export default function Admin() {

    const [allListings, setAllListings] = useState([] as ExperienceInfo[] | undefined);
    const allListingsQuery = api.experience.getAllAdmin.useQuery();
    const administerExperienceMutation = api.experience.administerExperience.useMutation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAllListings(allListingsQuery.data);
    }, [allListingsQuery.data]);

    const handleUpdateExperience = async (values:AdminUpdateValues) => {
        setLoading(true);
        await administerExperienceMutation.mutateAsync({
            experienceId: values.experienceId,
            verify: values.verify,
            externalListing: values.externalListing,
            externalListingLink: values.externalListingLink,
            externalHostName: values.externalHostName
            
        });
        setLoading(false);
        alert("Updated");
    }

    return (
        <div>
            <div className={`${styles.csstable} border-2 ${loading ? "opacity-80 disabled" : ""}`}>
                <div>
                    <div>Title</div>
                    <div>Host</div>
                    <div>Description</div>
                    <div>First Availability</div>
                    <div>Verified?</div>
                    <div>External Listing?</div>
                    <div>External Host Name</div>
                    <div>External Listing Link</div>
                    <div>Update</div>
                </div>
                {allListings?.map(listing => (
                    <Formik
                        key={listing.id}
                        initialValues={{
                            experienceId: listing.id,
                            verify: listing.verified,
                            externalListing: listing.isExternalListing,
                            externalListingLink: listing.externalListingLink,
                            externalHostName: listing.externalHostName
                        }}
                        onSubmit={handleUpdateExperience}
                    >
                        <Form>
                            
                                <div>{listing.title}</div>
                                <div>{listing.profile?.firstName} {listing.profile?.lastName}</div>
                                <div>{listing.description}</div>
                                <div>{listing.availability.at(0)?.date?.toDateString()}</div>
                                <div>
                                    <Field name="verify" type="checkbox" />
                                </div>
                                <div>
                                    <Field name="externalListing" type="checkbox" />
                                </div>
                                <div>
                                    <Field name="externalHostName" type="text" className="outline outline-1 rounded-md"/>
                                </div>
                                <div>
                                    <Field name="externalListingLink" type="text" className="outline outline-1 rounded-md"/>
                                </div>
                                <div>
                                    <button type="submit" className=" bg-amber-400 hover:bg-amber-300 rounded-lg py-1 px-3">Update Experience</button>
                                </div>
                        </Form>                                
                    </Formik>
                ))}
            </div>
        </div>
    );
}