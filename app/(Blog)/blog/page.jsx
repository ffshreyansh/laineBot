import BlogContainer from "@/components/blog-container";
import Navbar from "@/components/navbar";
import { client } from "@/sanity/lib/client";
import React from "react";

async function getData() {
  const post = await client.fetch(
    `
    *[_type == "post"] {
      title,
      "name": author->name,
      "slug": slug.current,      
      "contImg":  mainImage.asset->url,
      description,
      author->{"name": name, "profilePicture": image.asset->url}
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
    <div className="max-w-7xl mx-auto mt-32 space-y-10">
      <div>
        <Navbar/>
      </div>
      <BlogContainer data={data} />
    </div>
  );
};

export default Blog;
