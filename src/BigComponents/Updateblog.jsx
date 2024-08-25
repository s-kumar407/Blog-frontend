import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Component() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  // Fetch user's blog posts
  async function getYourPosts() {
    try {
      const id = JSON.parse(localStorage.getItem("user")).userData._id;

      const result = await axios.get(
        `${import.meta.env.VITE_URI}:${import.meta.env.VITE_PORT}/blog/${id}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).auth,
            
          },
        }
      );
      if(result)
      {
        console.log(result);
        setBlogs(result.data);
        setLoading(false);
      }
    
    } catch (err) {
      console.error(err);
      setBlogs([]);
      setError("Failed to fetch your blog posts.");
      setLoading(false);
    }
  }

  useEffect(() => {
    getYourPosts();
  }, []);

  // Navigate to edit blog page
  function handleBlogEdit(blogId) {
    nav(`/updateSingleblog/${blogId}`);
  }

  // Handle blog deletion
  async function handleBlogDelete(blogId) {
    try {
      let result = await axios.delete(
        `${import.meta.env.VITE_URI}:${
          import.meta.env.VITE_PORT
        }/deleteBlog/${blogId}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).auth,
          },
        }
      );
      if (result) {
     
        alert("Blog deleted!")
        getYourPosts();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete the blog. Please try again.");
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 my-5">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {(JSON.parse(localStorage.getItem("user")).userData.name).toUpperCase()} , Your Blog Posts
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore your blog posts and manage them as needed.
            </p>
          </div>
        </div>
        {error && <div className="text-center text-red-600 py-4">{error}</div>}
        <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((element) => (
              <Card key={element._id} className="h-full">
                <CardContent className="p-0">
                  <img
                    src={`${import.meta.env.VITE_URI}:${
                      import.meta.env.VITE_PORT
                    }/blogPics/${element.blogImageName}`}
                    width={400}
                    height={225}
                    alt={element.title}
                    className="object-cover aspect-video"
                  />
                </CardContent>
                <CardHeader>
                  <CardTitle>{element.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div>
                        {JSON.parse(localStorage.getItem("user")).userData
                          .name || "Loading..."}
                      </div>
                      <div>•</div>
                      <div>{element.publishDate}</div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col">
                  <p className="text-muted-foreground line-clamp-3">
                    {element.content}
                  </p>
                  <div className="flex flex-row justify-between w-full my-3">
                    <Button
                      className="ml-2 w-20"
                      onClick={() => handleBlogEdit(element._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-600 w-20"
                      onClick={() => handleBlogDelete(element._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center w-full">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                You don't have any blog posts!
              </h1>
              <p className="text-xl font-bold tracking-tighter text-red-400">
                Please create a blog first!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
