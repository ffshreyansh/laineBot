"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogContainer = ({ data }) => {
  console.log("Cont Data", data);
  return (
    <div className="space-y-20">
      <div className="space-y-10 ">
        <div className="w-full lg:w-1/2 mx-auto">
          <p className="text-5xl text-center font-bold">Our Blogs </p>
          </div>
        <div>
          <div className="mx-auto space-y-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 p-2 lg:p-0">
              {data.map((post) => (
                <Link href={`/blog/${post.slug}`} className="hover:shadow-lg rounded-br-lg rounded-bl-lg duration-300">
                  <article key={post._id} className="flex flex-col">
                    <div aria-label={post.title}>
                      <img src={post.imgg}
                        className="object-cover w-full h-80 rounded-tr-lg rounded-tl-lg shadow-md duration-300 mx-auto"
                        alt={`${post.title} image`} />
                    </div>
                    <div className="flex flex-col flex-1 p-6 rounded-lg">
                      <div className="text-xs tracki  hover:underline text-rose-600 flex items-center gap-2">
                        <img src={post.author.profilePicture} alt={`${post.author.name} profile picture`}
                          height={30}
                          width={30}
                          className=" rounded-full object-cover object-center"
                        />
                        {post.author.name}
                      </div>
                      <h3 className="flex-1 py-2 text-lg font-semibold">
                        {post.title}
                      </h3>
                      <p class="truncate w-100">{post.body[0].children[0].text}</p>
                      <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs">
                        <span>{post._createdAt}</span>{" "}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
