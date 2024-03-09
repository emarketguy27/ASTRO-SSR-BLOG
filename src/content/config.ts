// Import dependencies for collections - z refers to ZOD - Data types authentication
import { defineCollection, z } from "astro:content";

// Define collection schema
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

// export collection for use
export const collections = {
  blog: blogCollection,
};
