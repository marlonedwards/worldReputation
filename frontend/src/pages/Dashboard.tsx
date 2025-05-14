
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { StatCard } from "@/components/dashboard/StatCard";
import { GameCard, Game } from "@/components/dashboard/GameCard";
import { ConnectCard } from "@/components/dashboard/ConnectCard";
import { Gamepad, Trophy, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  const [connections, setConnections] = useState({
    steam: false,
    starknet: false
  });
  
  // Mock recent games
  const recentGames: Game[] = [
    {
      id: "1",
      title: "Dota 2",
      platform: "steam",
      image: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg",
      hoursPlayed: 1205,
      lastPlayed: "2023-05-10T15:32:00Z",
      achievements: { completed: 78, total: 167 }
    },
    {
      id: "2",
      title: "Counter-Strike 2",
      platform: "steam",
      image: "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
      hoursPlayed: 378,
      lastPlayed: "2023-05-12T21:15:00Z",
      achievements: { completed: 34, total: 167 }
    },
    {
      id: "3",
      title: "Influence",
      platform: "starknet",
      image: "https://img.rgstatic.com/content/game/influence-23931/header.jpg",
      hoursPlayed: 42,
      lastPlayed: "2023-05-11T18:45:00Z",
      achievements: { completed: 12, total: 25 }
    },
    {
      id: "4",
      title: "Eternal Dragons",
      platform: "starknet",
      image: "https://www.eternaldragons.com/wp-content/uploads/2022/03/Featured-Image-ED.jpg",
      hoursPlayed: 23,
      lastPlayed: "2023-05-09T14:20:00Z",
      achievements: { completed: 8, total: 30 }
    }
  ];

  const handleConnectPlatform = (platform: keyof typeof connections) => {
    // In a real app, this would trigger authentication flow
    setConnections(prev => ({ ...prev, [platform]: true }));
    
    toast({
      title: `Connected to ${platform === 'steam' ? 'Steam' : 'Starknet'}`,
      description: `Your ${platform} account has been successfully connected.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome to worldRep</h1>
          <p className="text-muted-foreground">
            Connect your accounts to make your forever gaming profile.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConnectCard
            title="Steam"
            description="Import your Steam games, achievements, and playtime"
            icon={<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233 233" fill="#fff"><path d="M104.515 105.554c-6.8 0-12.593 4.179-14.964 10.095l6.359 2.641c1.584-3.325 4.962-5.619 8.873-5.619 5.417 0 9.805 4.388 9.805 9.805 0 5.417-4.388 9.805-9.805 9.805-.215 0-.428-.008-.638-.023l-6.554-2.683c2.054 5.392 7.277 9.222 13.425 9.222 7.922 0 14.342-6.421 14.342-14.342s-6.421-14.341-14.342-14.341-7.001-4.561-6.501-4.561z"/><path d="M116.5 0C52.13 0 0 52.13 0 116.5S52.13 233 116.5 233 233 180.87 233 116.5 180.87 0 116.5 0zm49.452 116.5c0 14.438-11.729 26.167-26.167 26.167-1.375 0-2.723-.116-4.043-.324l-13.516 9.685c.037.549.075 1.1.075 1.657 0 13.382-10.846 24.229-24.229 24.229s-24.229-10.846-24.229-24.229c0-1.864.22-3.677.617-5.419L47.842 131.21c-6.701-2.494-11.512-8.928-11.512-16.545 0-9.715 7.875-17.59 17.59-17.59 6.583 0 12.316 3.62 15.338 8.981l27.048 19.815c6.725-.519 12.759-3.388 17.212-7.842 6.326-6.326 10.229-15.039 10.229-24.695 0-19.059-15.452-34.511-34.511-34.511-17.941 0-32.68 13.701-34.334 31.19L25.17 110.32c-3.044-18.708 1.83-37.433 13.015-52.121C52.236 38.424 72.5 28.333 94.5 28.333c17.489 0 33.632 5.547 46.855 14.955 13.595 9.644 24.109 23.291 29.975 39.268 3.039 8.279 4.67 17.148 4.67 26.361l-10.048 7.583z"/><path d="M142.092 73.932c-11.924 0-21.586 9.662-21.586 21.586s9.662 21.586 21.586 21.586 21.586-9.662 21.586-21.586-9.662-21.586-21.586-21.586zm.268 31.975c-5.723 0-10.356-4.634-10.356-10.356 0-5.723 4.634-10.356 10.356-10.356 5.723 0 10.356 4.634 10.356 10.356 0 5.722-4.633 10.356-10.356 10.356z"/></svg>}
            connected={connections.steam}
            buttonText="Connect Steam"
            onClick={() => handleConnectPlatform('steam')}
          />
          
          <ConnectCard
            title="Starknet"
            description="Find new games and preserve your gaming history"
            icon={<svg width="24" height="24" fill="currentColor" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M400 61.9275L84.5347 242.438V603.459L400 783.97L715.465 603.459V242.438L400 61.9275ZM656.232 242.438V558.045L400 693.322L143.768 558.045V242.438L400 107.161L656.232 242.438Z"/><path d="M400 467.854L491.039 415.481L400 363.107L308.961 415.481L400 467.854ZM431.662 550.809L582.074 467.854L431.662 384.899V550.809ZM368.338 384.899V550.809L217.926 467.854L368.338 384.899Z"/></svg>}
            connected={connections.starknet}
            buttonText="Connect to Starknet"
            onClick={() => handleConnectPlatform('starknet')}
          />
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Games"
            value="42"
            description="Across all platforms"
            icon={<Gamepad size={18} />}
            trend={8}
          />
          <StatCard
            title="Achievements"
            value="613"
            description="230 this month"
            icon={<Trophy size={18} />}
            trend={12}
          />
          <StatCard
            title="Play Time"
            value="2,486 hrs"
            description="Weekly avg: 23.4 hrs"
            icon={<Clock size={18} />}
            trend={-4}
          />
          <StatCard
            title="Days Active"
            value="189"
            description="Last 365 days"
            icon={<Calendar size={18} />}
            trend={6}
          />
        </div>
        
        {/* Activity Heatmap */}
        <ActivityHeatmap />
        
        {/* Recent Games */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recently Played</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
