import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";


const fetchBlog = async (id: string) => {
  const res = await fetch(
    `https://blog-backend-eight-olive.vercel.app/api/blogs/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
};

function Edit() {
  const { id } = useParams();
  if (!id) {
    return <div className="text-center py-12">Invalid blog ID</div>;
  }
  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogData", id],
    queryFn: () => fetchBlog(id),
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      publicationDate: "",
      category: "",
      subCategory: "",
      travelTags: "",
      summary: "",
      content: "",
      images: FileList,

    },
  });
  useEffect(() => {
    if (blogData) {
      reset(blogData); 
    }
  }, [blogData, reset]);

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error.message}
      </div>
    );
  console.log(blogData);
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await fetch(
        `https://blog-backend-eight-olive.vercel.app/api/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedBlog = await response.json();

      console.log("Blog updated successfully:", updatedBlog);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[80%] m-auto"
      >
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
        <div className="img flex w-25 h-30 gap-5">
          {blogData?.imageUrls &&
            blogData?.imageUrls.map((url: string) => {
              return <img src={url} alt="" />;
            })}
         
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
    </main>
  );
}

export default Edit;
