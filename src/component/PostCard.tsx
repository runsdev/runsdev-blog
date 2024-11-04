import Link from "next/link";
import { Post } from "@prisma/client";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <time className="text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>
    </Link>
  );
}
