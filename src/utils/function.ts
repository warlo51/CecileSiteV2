import imageUrlBuilder from "@sanity/image-url";
import {client} from "../database/sanity";

export function urlFor(source: any) {
    const builder = imageUrlBuilder(client)
    return builder.image(source)
}

export function reverseString(str: string) {
    const splitString = str.split("-");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("-");
    return joinArray;
}

