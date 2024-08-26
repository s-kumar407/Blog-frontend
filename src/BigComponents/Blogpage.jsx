import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Component() {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [file, setFile] = useState(null);
  let [error, setError] = useState(null); // To store error messages
  let nav = useNavigate();

  axios.defaults.withCredentials = true;
  async function handleBlog(e) {
    e.preventDefault();

    // Validate fields
    if (!title || !content || !file) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", file);
    formData.append(
      "userID",
      JSON.parse(localStorage.getItem("user")).userData._id
    );

    try {
      let blog = await axios.post(`${import.meta.env.VITE_URI}/bloglist`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: JSON.parse(localStorage.getItem("user")).auth,
        },
      });
      if (blog) {
        
        alert("Blog Published!!");
        nav("/");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      setError("Something went wrong. Please try again.");
      nav("/blogpage");
    }
  }

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                Create a New Blog Post
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Share your thoughts and ideas with the world.
              </p>
            </div>
            <form className="grid gap-6" onSubmit={handleBlog} method="POST">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog post here..."
                  className="min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] w-full"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
             
              <div className="mb-4">
                <Label htmlFor="featured-image">Featured Image</Label>
                <div className="flex items-center">
                  <Input
                    id="featured-image"
                    type="file"
                    className="cursor-pointer w-full"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="justify-center w-full sm:w-auto">
                Publish
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}



