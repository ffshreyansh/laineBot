import { client } from "@/sanity/lib/client";
import React from "react";

async function getData(slug) {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == "${slug}"][0]{title, "name": author->name}
  `,
    { slug }
  );
  return post;
}

export const dynamic = "force-dynamic";

const Blog = async ({ params }) => {
  // console.log(params);
  const data = await getData(params.slug);

  console.log(data);

  return <div>{data.title}</div>;
};

export default Blog;
