
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface Game {
  id: string;
  title: string;
  platform: "steam" | "starknet" | "both";
  image: string;
  hoursPlayed: number;
  lastPlayed: string;
  achievements: {
    completed: number;
    total: number;
  };
}

interface GameCardProps {
  game: Game;
  className?: string;
}

export function GameCard({ game, className }: GameCardProps) {
  const achievementPercentage = game.achievements.total > 0 
    ? Math.round((game.achievements.completed / game.achievements.total) * 100) 
    : 0;

  const getPlatformBadge = (platform: Game["platform"]) => {
    switch (platform) {
      case "steam":
        return (
          <span className="bg-[#1b2838] text-white text-xs px-2 py-0.5 rounded absolute top-2 right-2">
            Steam
          </span>
        );
      case "starknet":
        return (
          <span className="bg-worldrep-purple text-white text-xs px-2 py-0.5 rounded absolute top-2 right-2">
            Starknet
          </span>
        );
      case "both":
        return (
          <span className="bg-gradient-to-r from-[#1b2838] to-worldrep-purple text-white text-xs px-2 py-0.5 rounded absolute top-2 right-2">
            Both
          </span>
        );
    }
  };
  
  const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000; // seconds in a year
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400; // seconds in a day
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60; // seconds in a minute
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Card className={cn("overflow-hidden group hover:border-worldrep-accent-neon/40 transition-all duration-300", className)}>
      <div className="relative h-36">
        <img 
          src={game.image || "/placeholder.svg"} 
          alt={game.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        {getPlatformBadge(game.platform)}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-bold text-white truncate">{game.title}</h3>
          <div className="flex justify-between items-center text-xs text-white/80 mt-0.5">
            <span>{game.hoursPlayed} hrs</span>
            <span>Last played {timeSince(game.lastPlayed)}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-center text-sm">
          <span>Achievements</span>
          <span className="font-medium">{game.achievements.completed}/{game.achievements.total}</span>
        </div>
        <Progress value={achievementPercentage} className="h-1.5 mt-1" />
      </CardContent>
    </Card>
  );
}
