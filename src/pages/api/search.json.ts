// This is creating an API endpoint for querying the content
// This file will be removed on "build"

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get("query");
  console.log(query);

  // Handle if query not found
  if (query === null) {
    return new Response(
      JSON.stringify({
        error: "Query param is missing",
      }),
      {
        status: 400, //Bad request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const allBlogArticles: CollectionEntry<"blog">[] = await getCollection(
    "blog"
  );

  // Filter output articles based on search query
  const searchResults = allBlogArticles.filter((article) => {
    const titleMatch: boolean = article.data.title.includes(
      query!.toLocaleLowerCase()
    );

    const bodyMatch: boolean = article.body.includes(
      query!.toLocaleLowerCase()
    );

    const slugMatch: boolean = article.slug.includes(
      query!.toLocaleLowerCase()
    );

    return titleMatch || bodyMatch || slugMatch;
  });

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
