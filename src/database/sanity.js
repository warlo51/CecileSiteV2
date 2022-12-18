import { createClient } from "next-sanity";

export const client = createClient({
    projectId: `${process.env.NEXT_PUBLIC_PROJECTID}`,
    dataset: `${process.env.NEXT_PUBLIC_DATASET}`,
    apiVersion: "2022-12-17",
    useCdn: false
});
