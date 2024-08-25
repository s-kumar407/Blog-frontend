import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  axios.defaults.withCredentials = true;
  const nav = useNavigate();

  useEffect(() => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.auth) {
        nav("/");
      }
     
    } catch (error) {
      console.log(error);
    }
   
  }, [nav]);

  async function onUpload(e) {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!imageFile) newErrors.imageFile = "Profile image is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", imageFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_URI}:${import.meta.env.VITE_PORT}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming response.data contains the user data and auth token
      localStorage.setItem(
        "user",
        JSON.stringify({
          userData: response.data.result,
          auth: `bearer ${response.data.auth}`,
        })
      );

      alert("User created successfully");
      nav("/");
    } catch (error) {
      console.error("Error uploading data:", error);
      setErrors({ form: "Error uploading data. Please try again." });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or sign in to your existing account{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Log in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onUpload} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="text-red-600">{errors.name}</span>}
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.username && <span className="text-red-600">{errors.username}</span>}
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-600">{errors.email}</span>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="text-red-600">{errors.password}</span>}
            </div>
            <div>
              <Label htmlFor="profile-image">Profile Image</Label>
              <Input
                id="profile-image"
                name="profileImage"
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              {errors.imageFile && <span className="text-red-600">{errors.imageFile}</span>}
            </div>
          </div>
          {errors.form && <p className="text-red-600 text-center">{errors.form}</p>}
          <div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
