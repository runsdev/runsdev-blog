import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, slug, categories, images } = await request.json();

    // Create post
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        slug,
        author_id: session.user.id,
        published: true,
      })
      .select()
      .single();

    if (postError) throw postError;

    // Add categories
    if (categories && categories.length > 0) {
      const categoryPromises = categories.map(async (name: string) => {
        // Find or create category
        const { data: category, error: categoryError } = await supabase
          .from("categories")
          .insert({ name, slug: name.toLowerCase().replace(/\s+/g, "-") })
          .select()
          .single();

        if (categoryError && categoryError.code !== "23505")
          throw categoryError;

        // Link category to post
        const { error: linkError } = await supabase
          .from("post_categories")
          .insert({
            post_id: post.id,
            category_id: category?.id,
          });

        if (linkError) throw linkError;
      });

      await Promise.all(categoryPromises);
    }

    // Add images
    if (images && images.length > 0) {
      const { error: imagesError } = await supabase.from("post_images").insert(
        images.map((url: string) => ({
          post_id: post.id,
          url,
        }))
      );

      if (imagesError) throw imagesError;
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
