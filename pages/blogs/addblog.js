import { useRouter } from 'next/router';
import { useState } from 'react';
import { uploadblogImage, addNewblog } from '../../lib/fetchData';
import Link from 'next/link';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';


const Addblog = () => {
  const router = useRouter();
  const currentDate = new Date();

// Format the date and time without seconds
const formattedDate = currentDate.toLocaleDateString();
  const [blogData, setblogData] = useState({
    title: '',
    author: '',
    content: EditorState.createEmpty(), // Initialize with an empty editor state
    tags: '',
    date: formattedDate,
    image: null, // Change this if you have a default image for new blogs
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddblog = async () => {
    try {
      setLoading(true);
  
      // Extract content from the editor state
      const contentState = blogData.content.getCurrentContent();
      const contentRaw = convertToRaw(contentState);
      const content = JSON.stringify(contentRaw);
  
      let imageUrl = null;
  
      if (imageFile) {
        // Assuming you have a function to handle image uploads
        imageUrl = await uploadblogImage(imageFile);
      } else {
        // If no image selected, you may want to set a default image URL here
        imageUrl = blogData.image || ''; // Change this if you have a default image for new blogs
      }
  
      // Prepare the new blog data
      const newblog = {
        ...blogData,
        content: content, // Update the content field
        image: imageUrl,
      };
  
      // Add the new blog to the database
      await addNewblog(newblog);
  
      router.push(`/blogs`); // Redirect to the blog list page
    } catch (error) {
      console.error('Error adding new blog:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (field, value) => {
    setblogData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  

  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mx-auto max-w-270">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-bold text-black dark:text-black">
                Add New blog
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                  <Link href={`/blogsPage/`}>
                     
                    </Link>
                  </li>
                  <li className="font-medium text-primary">Add blog</li>
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
    />
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
    />
  </div>
</div> 

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black">
   Image
  </label>
  <div className="relative">
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
           id="formFile"
           onChange={handleImageChange}
          />
            </div>   
      </div>



                  </div>

<div className="w-full">
  <label className="mb-3 mt-5 block text-sm font-medium text-black dark:text-black">
    Content
  </label>
  <div className="relative border border-stroke rounded pb-20">
    <Editor
      editorState={blogData.content}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(editorState) => handleChange('content', editorState)}
    />
  </div>
</div>

                  <div className="flex justify-end gap-4.5 mt-5">
                    <Link href="/blogs">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                        type="button"
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
                      type="button"
                      onClick={loading ? null : handleAddblog}
                    >
                      {loading ? 'Adding...' : 'Add blog'}
                    </button>
                  </div>
                </div>
              </div>
            </div>


     
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default Addblog;
