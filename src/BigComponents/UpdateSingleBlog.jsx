import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [blogID, setBlogID] = useState();
  axios.defaults.withCredentials = true;
  const params = useParams();
  const nav = useNavigate();

  // Fetch the blog details to be updated
  async function handleBlog() {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_URI}/updateBlog/${params.blogId}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).auth,
          },
        }
      );
      const blog = result.data;
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setBlogID(blog._id);
      } else {
        alert("Something went wrong while fetching the blog details.");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      alert("Failed to load blog data.");
    }
  }

  useEffect(() => {
    handleBlog();
  }, []);

  // Basic client-side validation
  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle blog update submission
  async function handleBlogUpdate(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }
      formData.append(
        "userID",
        JSON.parse(localStorage.getItem("user")).userData._id
      );

      const blog = await axios.put(
        `${import.meta.env.VITE_URI}/updateBlog/${blogID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: JSON.parse(localStorage.getItem("user")).auth,
          },
        }
      );
      if (blog) {
        alert("Blog updated successfully!");
        nav("/");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Update Blog Post
            </h1>
            <p className="text-muted-foreground">
              Edit your blog post details.
            </p>
          </div>
          <form className="grid gap-6" onSubmit={handleBlogUpdate}>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title && "border-red-600"}
              />
              {errors.title && (
                <span className="text-red-600">{errors.title}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your blog post here..."
                className={`min-h-[300px] ${errors.content && "border-red-600"}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <span className="text-red-600">{errors.content}</span>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="featured-image">Featured Image</Label>
              <div className="flex items-center">
                <Input
                  id="featured-image"
                  type="file"
                  className="cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <Button type="submit" className="justify-center">
              Update Blog
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

