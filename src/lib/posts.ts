import { supabase } from "./supabase";

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories: post_categories (
        category: categories (*)
      ),
      post_images (*)
    `
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return posts;
}

export async function getPostBySlug(slug: string) {
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories: post_categories (
        category: categories (*)
      ),
      post_images (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return post;
}
