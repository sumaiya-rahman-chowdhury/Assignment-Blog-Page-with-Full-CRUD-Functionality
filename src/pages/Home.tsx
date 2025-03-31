import { useQuery } from "@tanstack/react-query";
import CardsSection from "../components/CardsSection";
import PostBtn from "../components/PostBtn";
import SearchBar from "../components/SearchBar";
import { fetchPosts } from "../hooks/fetchPosts";
import { useState } from "react";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<string | undefined>(undefined);

  const { data: fetchedBlogsData, isLoading } = useQuery({
    queryKey: ["blogs", currentPage, category, subCategory],
    queryFn: () => fetchPosts(currentPage, postsPerPage, category, subCategory),
  });

  const blogs = fetchedBlogsData?.blogs ?? [];
  const totalPages = fetchedBlogsData?.totalPages ?? 1;

  const goToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };
  if (isLoading) {
    return <p className="text-center mt-20">Loading..............</p>;
  }
  return (
    <div className="bg-[#E0F7FA] p-16">
      <h2 className="text-[34px] font-medium">Blogs</h2>
      <SearchBar setSubCategory={setSubCategory} setCategory={setCategory} />
      <CardsSection posts={blogs} />
      <PostBtn />
      <div className="pagination mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded-lg ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
