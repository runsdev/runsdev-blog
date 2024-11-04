import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      // Insert image into editor
      editor?.chain().focus().setImage({ src: publicUrl }).run();

      return publicUrl;
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div className="border rounded-lg p-2 mb-4">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-2 hover:bg-gray-100 rounded"
        >
          Bold
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
          }}
          disabled={uploading}
        />
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[400px] border rounded-lg p-4"
      />
    </div>
  );
}
