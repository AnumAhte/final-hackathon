import { groq } from "next-sanity";


export const allProducts = groq`*[_type == "products"]`;
export const four = groq`*[_type == "products"][0..3]`;
export const eight = groq`*[_type == "products"][4..7]`;
export const nine = groq`*[_type == "products"][3..6]`;
export const one = groq`*[_type == "products"][9..12]`;