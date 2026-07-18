import extraKeywords from "@/content/keywords.json";
import { getCollection } from "astro:content";

export async function getKeywords() : Promise<readonly string[]> {
    const techNames = new Set((await getCollection('techs')).flatMap(x => [x.data.name, x.id, ...x.data.aliases]));
    return [...extraKeywords, ...techNames].sort();
}