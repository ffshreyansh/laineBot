'use client'
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

const Post = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        const dd = await getPosts();
        setData(dd);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        // Handle the error appropriately
      }
    };
    fetchData();
  }, []); // Ensure dependencies are correctly listed if any

  return (
    <article>
      <h1>{data?.title}</h1>
    </article>
  );
};

// export async function generateStaticParams() {
//   const paths = await client.fetch(
//     `*[_type == "post" && defined(slug.current)][].slug.current`
//   )
//     console.log(paths);
//   return {
//     paths: paths.map((slug) => ({params: {slug}})),
//     fallback: true,
//   }
// }

export async function getPosts(context) {
  // const { slug = "" } = context.params
  const slug = 'alaine-blog'
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{title, "name": author->name}
  `, { slug })
  return post;
}

export default Post