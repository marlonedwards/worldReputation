
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-worldrep-dark-bg">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <div className="mb-6">
          <span className="text-xl font-medium bg-gradient-to-r from-worldrep-accent-neon to-worldrep-blue bg-clip-text text-transparent">
            Page Not Found
          </span>
        </div>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home size={18} />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
