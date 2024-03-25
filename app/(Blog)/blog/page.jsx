import BlogContainer from "@/components/blog-container";
import { client } from "@/sanity/lib/client";
import React from "react";

async function getData() {
  const post = await client.fetch(
    `
    *[_type == "post"] {
      title,
      "name": author->name,
      "slug": slug.current,
      description,
      mainImage,
      author->{"name": name}
    }
    `
  );
  return post;
}

export const dynamic = "force-dynamic";

const Blog = async () => {
  // console.log(params);
  const data = await getData();

  // console.log(data);

  return (
    <div className="max-w-6xl mx-auto my-20 space-y-10">
      <div>
        <h1 className="text-7xl font-extrabold">Blog</h1>
      </div>
      <BlogContainer data={data} />
    </div>
  );
};

export default Blog;
