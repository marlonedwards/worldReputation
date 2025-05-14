
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConnectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected?: boolean;
  buttonText: string;
  onClick: () => void;
  className?: string;
}

export function ConnectCard({
  title,
  description,
  icon,
  connected = false,
  buttonText,
  onClick,
  className
}: ConnectCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300", 
      connected ? "border-worldrep-accent-neon" : "",
      className
    )}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full", 
            connected ? "bg-worldrep-accent-neon/20" : "bg-muted"
          )}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {title}
              {connected && (
                <span className="text-xs bg-worldrep-accent-neon/20 text-worldrep-accent-neon px-2 py-0.5 rounded-full">
                  Connected
                </span>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {connected ? (
            <div className="space-y-1">
              <p>Successfully connected!</p>
              <p>Your data is being synchronized.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p>Not connected yet.</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onClick}
          variant={connected ? "outline" : "default"}
          className={cn(
            connected && "border-worldrep-accent-neon text-worldrep-accent-neon hover:bg-worldrep-accent-neon/10"
          )}
        >
          {connected ? "Refresh Connection" : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
