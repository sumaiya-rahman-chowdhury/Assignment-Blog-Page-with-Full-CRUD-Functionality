import Card from "../components/Card";
import PostBtn from "../components/PostBtn";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className="bg-[#E0F7FA] p-16">
      <h2 className="text-[34px] font-medium">Blogs</h2>
      <SearchBar />
      <Card />
      <PostBtn />
    </div>
  );
}

export default Home;
