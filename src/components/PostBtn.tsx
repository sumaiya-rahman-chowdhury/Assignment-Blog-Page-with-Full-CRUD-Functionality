import { Link } from "react-router-dom"

function PostBtn() {
  return (
   <Link to="/blog/post">
    <button className="bg-[#003B95] py-[11px] px-[39px] rounded-lg text-white mt-[60px]">
        Post your blog
    </button>
   </Link>
  )
}

export default PostBtn