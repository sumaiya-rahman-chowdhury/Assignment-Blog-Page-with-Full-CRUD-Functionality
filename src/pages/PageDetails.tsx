import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, fetchBlog } from "../hooks/fetchPosts";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { BiLocationPlus, BiUserCheck } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";

function PageDetails() {
  const navigate = useNavigate();
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
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error.message}
      </div>
    );
  console.log("blogData", blogData);
  console.log("first");
  const handleDelete = async (id: string) => {
    try {
      const isDeleted = await deleteBlog(id);
      if (isDeleted) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            {blogData?.category} • {blogData?.subCategory}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogData?.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <span className="flex items-center gap-2">
              <BiUserCheck className="text-2xl" />
              {blogData?.author}
            </span>
            <span className="flex items-center gap-2">
              <CiCalendarDate className="text-2xl" />
              {blogData?.publicationDate}
            </span>
            <span className="flex items-center gap-2">
              <BiLocationPlus className="text-2xl" />
              {blogData?.travelTags}
            </span>
            <Link
              to={`/blogs/edit/${blogData?._id}`}
              className="cursor-pointer"
            >
              <MdModeEdit className="shadow-lg" />
            </Link>
            {blogData && (
              <button
                className="cursor-pointer"
                onClick={() => handleDelete(blogData._id)}
              >
                <RiDeleteBinLine />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          {blogData?.imageUrls && (
            <img
              src={blogData?.imageUrls[0]}
              alt={blogData?.title}
              className="w-full h-[600px] object-cover"
            />
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Summary</h3>
          <p className="text-gray-700">{blogData?.summary}</p>
        </div>

        <div className="prose max-w-none prose-lg text-gray-700 mb-8">
          <p>{blogData?.content}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {
                blogData?.imageUrls && 
                blogData?.imageUrls.slice(1).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`${blogData.title} - Image ${index + 2}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))
            }
        </div>

        <div className="flex flex-wrap justify-between items-center border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-medium">Tags:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {blogData?.travelTags}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FaFacebook />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <BsTwitter />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageDetails;
