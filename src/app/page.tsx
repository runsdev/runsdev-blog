import { getPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
