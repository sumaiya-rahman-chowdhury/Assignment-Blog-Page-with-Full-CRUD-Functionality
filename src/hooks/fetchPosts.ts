import { BlogFormValues } from "./../pages/Post";

export type Post = BlogFormValues & {
  _id: string;
  imageUrls?: string[];
  blogs?: [];
  totalPages?: number;
};

const fetchPosts = async (
  page: number,
  limit: number,
  category?: string,
  subCategory?: string
): Promise<{ blogs: Post[]; totalPages: number }> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(category && { category }),
    ...(subCategory && { subCategory }),
  }).toString();
  const res = await fetch(
    `${import.meta.env.VITE_BASE_API}blogs/?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};
const fetchBlog = async (id:string):Promise<Post>=> {
    const res = await fetch(`${import.meta.env.VITE_BASE_API}blogs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch blog');
    return res.json();
  };
const deleteBlog = async (id:string):Promise<boolean>=>{

    const response = await fetch(`https://blog-backend-eight-olive.vercel.app/api/blogs/${id}`, {
        method: 'DELETE',
      });
    
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
     else{
        alert("Succesfully Delete blog")
        return true
     }
}
export { fetchPosts,fetchBlog ,deleteBlog};
