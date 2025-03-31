import { CiBookmark, CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import { FaCommentMedical } from "react-icons/fa";
import { Post } from "../hooks/fetchPosts";

interface CardProps {
  post: Post;
  imageUrls?: string[];
}
function Card({ post }: CardProps) {
  console.log("this is from card", post);
  return (
    <div className="max-w-[400px] h-auto space-y-3 shadow-lg bg-white p-4 rounded-lg cursor-pointer">
      <h2 className="text-[20px] font-bold">{post.title.slice(0, 29)}</h2>
      <div className="text-[12px] flex gap-5 items-center text-white">
        <p className="bg-[#003B95] py-[3px] px-[12px] rounded-full">
          {post.category}
        </p>
        <p className="bg-[#003B95] py-[3px] px-[12px] rounded-full">
          {post.subCategory}
        </p>
      </div>
      <p className="font-normal text-[16px] text-[#0F1419]">
        {post.summary.slice(0, 40)}
      </p>
      <div className="content bg-[#C4E0EE] py-[21px] px-[13px] rounded-lg">
        <p className="text-[14px] font-light text-[#536471] h-[70px]">
          {post.content.slice(0, 120)}
        </p>
        <Link className="underline underline-offset-1 text-[#003B95]" to={`/blogs/${post._id}`}>
          Read more
        </Link>
      </div>
      <div className="reaction text-[#536471] flex justify-between">
        <div className="flex gap-6">
          <div className="flex gap-3">
            <CiHeart className="text-2xl" />
            <p>300</p>
          </div>
          <div className="flex gap-3">
            <IoEyeOutline className="text-2xl" />
            <p>1.2k</p>
          </div>
        </div>
        <CiBookmark className="text-2xl" />
      </div>
      <div className="slider">
        <Slider images={post.imageUrls} />
      </div>
      <div className="author flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src="//"
            className="w-[50px] h-[50px] rounded-full bg-black object-fit-cover"
            alt=""
          />
          <div className="div">
            <h4 className="text-[16px]">{post.author}</h4>
            <p className="text-[12px] text-[#536471] font-normal">
              {post.publicationDate}
            </p>
          </div>
        </div>
        <div className="bg-[#003B95] py-[3px] px-[12px] rounded-full text-white flex items-center gap-2">
          <p>Follow</p>
          <span>
            <FaCommentMedical />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
