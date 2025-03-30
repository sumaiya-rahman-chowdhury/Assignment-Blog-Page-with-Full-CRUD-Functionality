import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type BlogFormValues = {
    author: string;
    title: string;
    publicationDate: string;
    category: string;
    subCategory: string;  
    travelTags: string;   
    summary: string;
    content: string;
    images: File[] | null; 
  };
  
  const BlogForm = () => {
    const { register, handleSubmit, control, setValue, watch,reset } =
      useForm<BlogFormValues>({
        defaultValues: {
          author: "",
          title: "",
          publicationDate: "",
          category: "",
          subCategory: "",  
          travelTags: "",    
          summary: "",
          content: "",
          images: null,
        },
      });
  
    const [preview, setPreview] = useState<BlogFormValues | null>(null);
  
    const mutation = useMutation({
      mutationFn: async (data: BlogFormValues) => {
        const formData = new FormData();
  
        Object.entries(data).forEach(([key, value]) => {
            if (key === "images" && value) {
                (value as File[]).forEach((file) => formData.append("images", file));
              } else if (value !== null) {
                formData.append(key, String(value)); 
              }
        });
  
        return fetch("/api/blogs", {
          method: "POST",
          body: formData,
        });
      },
      onSuccess: () => {
        alert("Blog published successfully!");
        reset()
      },
    });
  
    const onSubmit = (data: BlogFormValues) => {
      mutation.mutate(data);
      console.log(data);
    };

  return (
    <div className=" mx-auto bg-blue-100 p-6 rounded-md shadow-md w-full">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[80%] m-auto">
      <h2 className="text-lg font-bold mb-4">Blog Form</h2>
        <div className="grid grid-cols-2 gap-5 justify-center  ">
          {/* Author Name */}
          <div className="flex items-center gap-5">
            <label htmlFor="">Author Name</label>
            <input
              {...register("author")}
              placeholder="Author Name"
              className=" px-[50px] py-[10px] rounded-md border-[1px] border-blue-900"
            />
          </div>
          <div className="flex items-center gap-5">
            {/* Publication Date */}
            <label htmlFor="">Publication Date</label>
            <input
              type="date"
              {...register("publicationDate")}
              className="border-[1px] border-blue-900 px-[50px] py-[10px] rounded-md"
            />
          </div>
          {/* Blog Title */}
          <div className="flex items-center gap-5">
            <label htmlFor="">Blog Title</label>
            <input
              {...register("title")}
              placeholder="Enter the title of your blog post"
              className="border-[1px] border-blue-900 px-[50px] py-[10px] rounded-md"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-5">
            <label htmlFor="">Category</label>
            <select
              {...register("category")}
              className="border-[1px] border-blue-900 px-[50px] py-[10px] rounded-md"
            >
              <option value="">Select a category</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>
          {/* Sub-Category */}
          <div className="flex items-center gap-5">
            <label htmlFor="">Sub-Category</label>
            <Controller
              name="subCategory"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border-[1px] border-blue-900 px-[50px] py-[10px] p-2 rounded-md"
                  onChange={(e) => field.onChange(e.target.value)} // Ensure it updates correctly
                >
                  <option value="">Select Sub-Category</option>{" "}
                  {/* Default placeholder */}
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                </select>
              )}
            />
          </div>
          {/* sum */}
          <div className="flex items-center gap-5">
            <label htmlFor="">Summary</label>
            <textarea
              {...register("summary")}
              placeholder="Summary"
              className="border-[1px] border-blue-900 px-[50px] py-[10px] rounded-md "
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="">Travel Tags</label>
            {/* Travel Tags */}
            <Controller
              name="travelTags"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  // multiple
                  className="border-[1px] border-blue-900 px-[50px] py-[10px] rounded-md"
                >
                  <option value="Beach">Beach</option>
                  <option value="Mountain">Mountain</option>
                </select>
              )}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center gap-5">
          <label htmlFor="">Main Content</label>
          <textarea
            {...register("content")}
            placeholder="Write your blog content here"
            className="border-[1px] border-blue-900 px-[50px] py-[10px] rounded-md h-[149px]"
          />
        </div>
        {/* Image Upload */}
        <div className="flex items-center gap-5">
          <label htmlFor="">Main Content</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
            className="border px-[50px] py-[10px] rounded-md"
          />
        </div>

        {/* Preview & Autosave */}
        <div className="flex gap-2 pt-20 w-full justify-center pb-5">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded-full"
            onClick={() => setPreview(watch())}
          >
            Preview
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded-full"
            onClick={() => console.log("Autosaving...")}
          >
            Autosave
          </button>
        </div>

        {/* Publish Button */}
       <div className="flex w-full justify-center">
       <button
          type="submit"
          className="  px-19 py-3 rounded-full border-1 border-[#7099C8]"
        >
          Publish
        </button>
       </div>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold text-lg">Preview</h3>
          <p>
            <strong>Title:</strong> {preview.title}
          </p>
          <p>
            <strong>Summary:</strong> {preview.summary}
          </p>
          <p>
            <strong>Content:</strong> {preview.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogForm;
