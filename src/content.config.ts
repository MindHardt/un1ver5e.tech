import {defineCollection, z} from "astro:content";
import {glob} from "astro/loaders";

const zTechTag = z.union([
    z.literal('frontend'), z.literal('backend'), z.literal('devops')
]);
export const techTags = zTechTag.options.map(x => x.value);
export type TechTag = z.infer<typeof zTechTag>

const techs = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/techs' }),
    schema: ({ image }) => z.object({
        name: z.string(),
        aliases: z.array(z.string()).default([]),
        order: z.number().int(),
        image: image(),
        about: z.string().url(),
        level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
        tags: z.array(zTechTag).transform(x => [...new Set(x)]),
    })
});

const projects = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/projects' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        image: image(),
        company: z.string(),
        from: z.coerce.date(),
        to: z.coerce.date().optional(),
        role: z.string(),
        url: z.string().url().optional()
    })
})


export const collections = { techs, projects };