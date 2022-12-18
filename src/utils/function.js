import imageUrlBuilder from "@sanity/image-url";
import {client} from "../database/sanity";

export function urlFor(source) {
    const builder = imageUrlBuilder(client)
    return builder.image(source)
}

export function reverseString(str) {
    const splitString = str.split("-");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("-");
    return joinArray;
}

export function orderArticlePerDate(listOfArticles){

    return listOfArticles.sort(function (a, b) {
        return new Date(b._updatedAt) - new Date(a._updatedAt);
    });

}
