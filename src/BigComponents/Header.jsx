import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Component() {
  let [user, setUser] = useState();
  let nav = useNavigate();
  let auth = JSON.parse(localStorage.getItem("user"));

  function handleLogOut() {
    localStorage.removeItem("user");
    setUser();
    nav("/");
  }

  return (
    <div className="flex flex-col">
      <header className="bg-primary text-primary-foreground">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Blog</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden space-x-2 md:flex">
            {auth ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  Home
                </Link>
                <Link
                  to="/blogpage"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  Add blog
                </Link>
                <Link
                  to="/updateblog"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  Update blogs
                </Link>
                <button
                  onClick={handleLogOut}
                  className="text-sm font-medium hover:bg-primary/90 rounded-md px-3 py-2"
                >
                  Log out
                </button>
                <Link
                  to="#"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  <div className="rounded-full h-[50px] w-[50px] overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_URI}/usersProfilepics/${auth.userData.imageName}` || ""}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  Home
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90"
                >
                  LogIn
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Navigation - Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="grid gap-4 p-4">
                {auth ? (
                  <>
                    <Link
                      to="/"
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Home
                    </Link>
                    <Link
                      to="/blogpage"
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Add blog
                    </Link>
                    <Link
                      to="/updateblog"
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Update blogs
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Home
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      SignUp
                    </Link>
                    <Link
                      to="/login"
                      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      LogIn
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
