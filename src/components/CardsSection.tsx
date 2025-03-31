import { Post } from "../hooks/fetchPosts";
import Card from "./Card";

interface CardsSectionProps {
  posts?: Post[];
}
function CardsSection({ posts }: CardsSectionProps) {
  console.log("This is from card section",posts);
  return (
    <main className="grid grid-cols-3 items-center justify-center gap-7 mt-10 flex-wrap w-full">
      {posts?.map((post) => {
        return <Card key={post._id} post={post} />
      })}
    </main>
  );
}

export default CardsSection;
