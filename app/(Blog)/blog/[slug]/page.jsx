import { client } from "@/sanity/lib/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { PortableText } from "@portabletext/react";

async function getData(slug) {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == "${slug}"][0]{
      title,
      "name": author->name,
      "slug": slug.current,
      "contImg":  mainImage.asset->url,
      body,
      author->{"name": name, "profilePicture": image.asset->url},
    }
  `,
    { slug }
  );
  return post;
}

export const dynamic = "force-dynamic";

export const RichTextComponents = {
  types: {
    image: ({ value, isInline }) => {
      const { width, height } = getImageDimensions(value);
      return (
        <img
          src={imageBuilder.image(value).url()}
          alt={value.alt || " "}
          loading="lazy"
          className={`my-8 mx-auto ${
            isInline ? "max-w-xs" : "max-w-full"
          } rounded-lg shadow-lg`}
          style={{ aspectRatio: width / height }}
        />
      );
    },
  },

  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-2xl text-red-400">{children}</h1>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),

    // Ex. 2: rendering custom styles
    customHeading: ({ children }) => (
      <h2 className="text-lg text-primary text-purple-700">{children}</h2>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold my-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 my-4 italic text-gray-700 border-gray-300">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => <ul className="list-disc ml-8 my-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal ml-8 my-4">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-2">{children}</li>,
    p: ({ children }) => <p className="text-xl my-4">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-blue-500 hover:text-blue-700"
        >
          {children}
        </Link>
      );
    },
  },
};

const BlogPost = async ({ params }) => {
  const data = await getData(params.slug);

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto mt-28">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="mx-auto mt-10">
          <div className="flex flex-col max-w-7xl mx-auto overflow-hidden rounded">
            <Image
              src={data.contImg}
              height={700}
              width={1000}
              alt=""
              className="w-full h-[70vh] object-cover object-center"
            />
            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-5xl sm:px-10 lg:rounded-md shadow-lg bg-white dark:bg-black">
              <div className="space-y-2">
                <span className="inline-block text-2xl font-semibold sm:text-3xl">
                  {data.title}
                </span>
                <p className="text-xs flex items-center gap-2 cursor-pointer">
                  <Image
                    src={data.author.profilePicture}
                    height={30}
                    width={30}
                    alt=""
                    className=" rounded-full object-cover object-center"
                  />
                  <span className="text-xs hover:underline">{data.name}</span>
                </p>
              </div>
              <div className="">
                <p>
                  <PortableText
                    value={data.body}
                    components={RichTextComponents}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
