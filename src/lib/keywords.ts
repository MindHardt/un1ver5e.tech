import extraKeywords from "@/content/keywords.json";
import { getCollection } from "astro:content";
import { distinctBy } from "./collections";

export async function getKeywords() : Promise<readonly string[]> {
    const techNames = new Set((await getCollection('techs')).flatMap(x => [x.data.name, x.id, ...x.data.aliases]));
    return [...extraKeywords, ...distinctBy(techNames, x => x.toUpperCase())].sort();
}