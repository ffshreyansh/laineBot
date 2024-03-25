import BlogContainer from "@/components/blog-container";
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

const BlogPost = async ({ params }) => {
  // console.log(params);
  const data = await getData(params.slug);

  // console.log(data);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <div>
        <h1 className="text-7xl font-bold">Blog</h1>
      </div>
      {data?.title}
      {data?.name}
    </div>
  );
};

export default BlogPost;
