import extraKeywords from "@/content/keywords.json";
import { getCollection } from "astro:content";

export async function getKeywords() : Promise<readonly string[]> {
    const techNames = (await getCollection('techs')).map(x => x.data.name);
    return [...extraKeywords, ...techNames];
}