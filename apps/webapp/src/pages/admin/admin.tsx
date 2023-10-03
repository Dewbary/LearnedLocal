import { add } from "date-fns";
import { Field, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import DateAndTimePicker from "~/components/common/DateAndTimePicker";
import { ExperienceInfo } from "~/components/types";
import { api } from "~/utils/api";

interface FormValues {
    title: string;
    description: string;
    price: number;
    free: boolean;
    city: string | null;
    photos: string[];
    categoryId: number;
    profileId: string;
    availabilityDate: Date;
    availabilityStartTime: Date;
    availabilityEndTime: Date;
}

export default function Admin() {

    const [externalListings, setExternalListings] = useState([] as ExperienceInfo[] | undefined);
    const externalListingQuery = api.experience.getExternalListings.useQuery();
    const addExternalListing = api.experience.createExternalListing.useMutation();

    const validate = (values:FormValues) => {
        
    }

    useEffect(() => {
        setExternalListings(externalListingQuery.data);
    }, [externalListingQuery.data]);

    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: 0,
                    free: '',
                    city: null,
                    categoryId: 0,
                    profileId: '',
                    availabilityYear: 2023,
                    availabilityMonth: 10,
                    availabilityDay: 3,
                    availabilityHour: 10,
                    availabilityMinute: 30,
                    availabilityAMPM: "AM",
                    availabilityDuration: 60
                }}
                onSubmit={(values) => {

                    const availabilityStartTime = new Date(1999, 8, 9, (values.availabilityAMPM === "AM" ? (values.availabilityHour === 12 ? 0 : values.availabilityHour) : values.availabilityHour + 12), values.availabilityMinute);
                    const availabilityEndTime = add(availabilityStartTime, {minutes: values.availabilityDuration});

                    addExternalListing.mutate({
                        title: values.title,
                        description: values.description,
                        price: values.price,
                        free: false,
                        city: "Provo",
                        photos: [
                            "photo1"
                        ],
                        categoryId: 0,
                        profileId: "asdf",
                        availabilityDate: new Date(values.availabilityYear, values.availabilityMonth - 1, values.availabilityDay),
                        availabilityStartTime: availabilityStartTime,
                        availabilityEndTime: availabilityEndTime
                    });}}
            >
            </Formik>
            <Form>
                <label htmlFor="title">Title</label>
                <Field name="title" type="text" />
                <label htmlFor="description">Title</label>
                <Field name="description" as="textarea" className="form-textarea" />
                <label htmlFor="price">Title</label>
                <Field name="price" type="number" />
                <label htmlFor="free">Free?</label>
                <Field name="free" type="checkbox" />

                <label htmlFor="availabilityYear">Year</label>
                <Field name="availabilityYear" type="number"/>
                <label htmlFor="availabilityMonth">Month</label>
                <Field name="availabilityMonth" type="number"/>
                <label htmlFor="availabilityDay">Day</label>
                <Field name="availabilityDay" type="number"/>

                <label htmlFor="availabilityHour">Hour</label>
                <Field name="availabilityHour" type="number" />
                <label htmlFor="availabilityMinute">Minute</label>
                <Field name="availabilityMinute" type="number" />
                <label htmlFor="availabilityAMPM">AM / PM</label>
                <Field name="availabilityAMPM" type="text"/>


                <button type="submit">List Experience</button>
            </Form>
            
            <h1>Existing External Listings:</h1>
            {externalListings?.map(experience => (
                <h1>Experience: {experience.title}</h1>
            ))}
        </div>
    );
}