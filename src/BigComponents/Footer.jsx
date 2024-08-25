import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="flex flex-col">
      <footer className="bg-muted py-6 text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 space-y-4 md:space-y-0">
          <p className="text-center md:text-left">
            &copy; 2023 Blog. All rights reserved.
          </p>
          <nav className="flex space-x-4 justify-center md:justify-start">
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <Link to="#" className="hover:underline">
              Terms
            </Link>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

