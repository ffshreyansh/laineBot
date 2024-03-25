"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogContainer = ({ data }) => {
  return (
    <div className="space-y-20">
      <div className="space-y-10 ">
        <div className="w-1/2 mx-auto">
        <p className="text-5xl text-center font-bold">Our Blogs </p>
        <p className="text-center mt-2 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ipsa id vitae unde distinctio nulla eos accusamus tenetur sapiente cumque!</p>
        </div>
        <div>
          <div className="mx-auto space-y-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 ">
              {data.map((post) => (
                <Link href={`/blog/${post.slug}`}>
                  <article key={post._id} className="flex flex-col">
                    <div aria-label={post.title}>
                      <Image
                        width={500}
                        height={500}
                        alt=""
                        className="object-cover w-[90%] h-52 hover:shadow-xl hover:shadow-gray-400 rounded-md shadow-md duration-300"
                        src={post.contImg}
                      />
                    </div>
                    <div className="flex flex-col flex-1 py-6">
                      <div className="text-xs tracki uppercase hover:underline text-rose-600">
                        {post.author.name}
                      </div>
                      <h3 className="flex-1 py-2 text-lg font-semibold">
                        {post.title}
                      </h3>
                      <p>{post.description}</p>
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
