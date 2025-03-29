import { CiBookmark, CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import { FaCommentMedical } from "react-icons/fa";

function Card() {
  return (
    <div className="w-[400px] h-auto space-y-3 shadow-lg bg-white p-4 rounded-lg cursor-pointer">
      <h2 className="text-[20px] font-bold">Exciting Adventure in the Alps</h2>
      <div className="text-[12px] flex gap-5 items-center text-white">
        <p className="bg-[#003B95] py-[3px] px-[12px] rounded-full">Hiking</p>
        <p className="bg-[#003B95] py-[3px] px-[12px] rounded-full">
          Adventure Travel
        </p>
      </div>
      <p className="font-normal text-[16px] text-[#0F1419]">
        Travel and you will born for a second time️️
      </p>
      <div className="content bg-[#C4E0EE] py-[21px] px-[13px] rounded-lg">
        <p className="text-[14px] font-light text-[#536471]">
          Explore the breathtaking views and thrilling experiences of hiking
          through the majestic Alps. From scenic trails to challenging peaks,
          discover why this adventure is a must for nature enthusiasts...
        </p>
        <Link className="underline underline-offset-1 text-[#003B95]" to="/">
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
        <Slider />
      </div>
      <div className="author flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src=""
            className="w-[50px] h-[50px] rounded-full bg-black object-fit-cover"
            alt=""
          />
          <div className="div">
            <h4 className="text-[16px]">Sam Guy</h4>
            <p className="text-[12px] text-[#536471] font-normal">
              Published on: December 15, 2024
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
