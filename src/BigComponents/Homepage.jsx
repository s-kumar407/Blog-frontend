import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Component() {
  let [blogs, setBlogs] = useState([]);
  let [userNames, setUserNames] = useState({}); // To store user names
  let [searchKey, setSearchKey] = useState("");

  async function getBlogs() {
    try {
      let result = await axios.get(
        `${import.meta.env.VITE_URI}:${import.meta.env.VITE_PORT}/bloglist`,
        {}
      );

      setBlogs(result.data);
      // Fetch user names for each blog
      const userNamesMap = {};
      for (const blog of result.data) {
        const userName = await getUser(blog.userID);
        userNamesMap[blog.userID] = userName;
      }
      setUserNames(userNamesMap); // Store user names in state
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser(id) {
    let result;
    try {
      result = await axios.get(
        `${import.meta.env.VITE_URI}:${import.meta.env.VITE_PORT}/user/${id}`,
        {}
      );
    } catch (error) {
      console.log(error);
    }
    return result.data.name;
  }

  function isTokenExpired(token) {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    return decoded.exp < currentTime; // Check if the token is expired
  }

  useEffect(() => {
    try {
      let token = JSON.parse(localStorage.getItem("user")).auth;
      if(token)
      {
        token = token.split(' ')[1];
        if (isTokenExpired(token)) {
          localStorage.removeItem("user");
          getBlogs();
        }
      }
    } catch (error) {
      console.log(error);
      getBlogs();
    }
  
   
   
  }, []);

  async function handleSearch() {
    try {
      if (searchKey) {
        let result = await axios.get(
          `${import.meta.env.VITE_URI}:${
            import.meta.env.VITE_PORT
          }/search/${searchKey}`,
          {}
        );
        if (result.data) {
          setBlogs(result.data);
        }
      } else {
        getBlogs();
      }
      setSearchKey("");
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }

  return (
    <div>
      {/* Search Section */}
      <section className="w-full pt-12">
        <div className="flex justify-center my-10">
          <div className="bg-background rounded-lg shadow-md px-4 py-2 w-full max-w-md flex items-center">
            <SearchIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              type="search"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none focus:outline-none"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <Button className="ml-2" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-4 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Unleash Your Creativity with Our Blog
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover a world of inspiring stories, insightful perspectives,
                and practical tips from our community of writers.
              </p>
              <div className="space-x-4 mt-6">
                {JSON.parse(localStorage.getItem("user")) ? (
                  <Link
                    to="/Blogpage"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Create Blog
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Create Blog
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4 h-[260px] w-full sm:w-[600px] md:w-[800px]">
              <img
                src="https://media.licdn.com/dms/image/D4E12AQEJfOREP1iNFg/article-cover_image-shrink_600_2000/0/1683060943298?e=2147483647&v=beta&t=W9T9z7fNUB66tdNxn0_dt2m155B4qJXnwNzRZ2r8QbI"
                alt="Hero"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Latest Blog Posts
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our latest blog posts and get inspired.
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            {blogs.length > 0 ? (
              blogs.map((element) => (
                <div key={element._id}>
                  <Link to="#" className="group">
                    <Card className="h-full">
                      <CardContent className="p-0">
                        <img
                          src={`${import.meta.env.VITE_URI}:${
                            import.meta.env.VITE_PORT
                          }/blogPics/${element.blogImageName}`}
                          alt="Blog Post Image"
                          className="object-cover aspect-video w-full h-full"
                        />
                      </CardContent>
                      <CardHeader>
                        <CardTitle>{element.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div>
                              {userNames[element.userID] || "Loading..."}
                            </div>
                            <div>•</div>
                            <div>{element.publishDate}</div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <p className="text-muted-foreground line-clamp-3">
                          {element.content}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Something went wrong
              </h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
