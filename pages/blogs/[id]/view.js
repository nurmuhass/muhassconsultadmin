import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchblogById } from '../../../lib/fetchData';
import Link from 'next/link';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blog = await fetchblogById(id);
        setBlogData(blog);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);


  if (!blogData) {
    return <div>Loading...</div>;
  }

  
  // Parse the content string
  const contentData = JSON.parse(blogData.content);

  // Convert to ContentState
  const contentState = convertFromRaw({ blocks: contentData.blocks, entityMap: {} });
  const editorState = EditorState.createWithContent(contentState);


  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mx-auto max-w-270">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-bold text-black dark:text-black">
                View blog
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                  <Link href={`/blogsPage/`}>
                     
                    </Link>
                  </li>
                  <li className="font-medium text-primary">View blog</li>
                </ol>
              </nav>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-black">
                   Blog Data
                  </h3>
                </div>
                <div className="p-7">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black">
                        Title
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="Title"
                          value={blogData.title}
                          onChange={(event) => handleChange('title', event.target.value)}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
    Author
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="Author"
      value={blogData.author}
      onChange={(event) => handleChange('author', event.target.value)}
      disabled
    />
  </div>
</div>


                  </div>

                  <div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black">
    Tags
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="Tags"
      value={blogData.tags}
      onChange={(event) => handleChange('tags', event.target.value)}
      disabled
    />
  </div>
</div> 


                  <div className="w-full">
  <label className="my-6 block text-lg font-medium text-black dark:text-black ">
   Image
  </label>
  <div className="relative">
  
      <img
          src={blogData.image}
          className="h-100 max-w-full rounded-lg"
          alt="" />

            </div>   
      </div>

<div className="w-full">
  <label className="mb-3 mt-5 block text-lg font-medium text-black dark:text-black">
    Content
  </label>
  <div className="relative border border-stroke rounded pb-20">
  <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          readOnly={true} // Set to true to make the editor read-only
          toolbarHidden={true}
        />
  </div>
</div>

                  <div className="flex justify-end gap-4.5 mt-5">
                    <Link href="/blogs">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                        type="button"
                      >
                        Back
                      </button>
                    </Link>
                    <Link href={`/blogs/${id}/edit`}>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
                      type="button"
                    >
                     Edit Blog
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>


     
           
          </div>
        </div>
      </main>
    </div>
  );
}
