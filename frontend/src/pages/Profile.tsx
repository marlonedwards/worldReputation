import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GameCard, Game } from "@/components/dashboard/GameCard";
import { 
  User, 
  Share2,
  Edit,
  Trophy,
  Clock,
  Calendar,
  Gamepad,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  Tooltip
} from "recharts";

const Profile = () => {
  const { toast } = useToast();
  
  // Mock user profile data
  const profile = {
    id: "user-123",
    username: "CryptoGamer",
    displayName: "Alex Thompson",
    avatarUrl: "https://i.pravatar.cc/300",
    connections: {
      steam: {
        connected: true,
        id: "steamuser123",
        gamesCount: 178,
        achievementsCompleted: 2834,
        totalPlaytime: 5621
      },
      starknet: {
        connected: true,
        address: "0x04a6e02f5b7c371c1f1c116168ebf254a9a22cf7d8b486a5985c278be7b9316d",
        gamesCount: 12,
        achievementsCompleted: 86,
        totalPlaytime: 320
      }
    },
    memberSince: "2023-01-15T00:00:00Z",
    shareableUrl: "https://worldrep.io/profile/CryptoGamer"
  };
  
  // Mock top games
  const topGames: Game[] = [
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
      id: "3",
      title: "Influence",
      platform: "starknet",
      image: "https://img.rgstatic.com/content/game/influence-23931/header.jpg",
      hoursPlayed: 42,
      lastPlayed: "2023-05-11T18:45:00Z",
      achievements: { completed: 12, total: 25 }
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
      id: "4",
      title: "Eternal Dragons",
      platform: "starknet",
      image: "https://www.eternaldragons.com/wp-content/uploads/2022/03/Featured-Image-ED.jpg",
      hoursPlayed: 23,
      lastPlayed: "2023-05-09T14:20:00Z",
      achievements: { completed: 8, total: 30 }
    }
  ];
  
  // Platform distribution data - improved colors for better contrast
  const platformData = [
    { name: 'Steam', value: 5621, color: '#66c0f4' }, // Lighter Steam blue
    { name: 'Starknet', value: 320, color: '#9d5ce5' }, // Lighter Starknet purple
  ];
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(profile.shareableUrl);
    
    toast({
      title: "Profile link copied",
      description: "Share it with your friends!",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Custom Tooltip for the PieChart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 rounded border shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            <span className="font-medium">{payload[0].value}</span> hours
          </p>
          <p className="text-xs text-muted-foreground">
            {Math.round((payload[0].value / (platformData[0].value + platformData[1].value)) * 100)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 h-32 bg-gradient-to-r from-worldrep-purple to-worldrep-blue" />
          <CardContent className="pt-16 pb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 -mt-12 z-10">
                {/* <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-background">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.displayName} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div> */}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShare} className="flex gap-1.5">
                      <Share2 size={16} />
                      Share
                    </Button>
                    <Button variant="outline" className="flex gap-1.5">
                      <Edit size={16} />
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-6">
                    <User size={16} />
                    <span>Member since {formatDate(profile.memberSince)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-6">
                    <Gamepad size={16} />
                    <span>{profile.connections.steam.gamesCount + profile.connections.starknet.gamesCount} games</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-6">
                    <Trophy size={16} />
                    <span>{profile.connections.steam.achievementsCompleted + profile.connections.starknet.achievementsCompleted} achievements</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-6">
                    <Clock size={16} />
                    <span>{Math.round((profile.connections.steam.totalPlaytime + profile.connections.starknet.totalPlaytime) / 24)} days played</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-4">
            {/* Activity Heatmap */}
            <ActivityHeatmap />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Platform Distribution - IMPROVED */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Total hours played per platform</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {platformData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke="rgba(0,0,0,0.1)"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry, index) => (
                          <span className="text-foreground">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Account Connections - IMPROVED */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Your gaming platform connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Steam Connection */}
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#1b2838]">
                          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233 233" fill="#fff"><path d="M104.515 105.554c-6.8 0-12.593 4.179-14.964 10.095l6.359 2.641c1.584-3.325 4.962-5.619 8.873-5.619 5.417 0 9.805 4.388 9.805 9.805 0 5.417-4.388 9.805-9.805 9.805-.215 0-.428-.008-.638-.023l-6.554-2.683c2.054 5.392 7.277 9.222 13.425 9.222 7.922 0 14.342-6.421 14.342-14.342s-6.421-14.341-14.342-14.341-7.001-4.561-6.501-4.561z"/><path d="M116.5 0C52.13 0 0 52.13 0 116.5S52.13 233 116.5 233 233 180.87 233 116.5 180.87 0 116.5 0zm49.452 116.5c0 14.438-11.729 26.167-26.167 26.167-1.375 0-2.723-.116-4.043-.324l-13.516 9.685c.037.549.075 1.1.075 1.657 0 13.382-10.846 24.229-24.229 24.229s-24.229-10.846-24.229-24.229c0-1.864.22-3.677.617-5.419L47.842 131.21c-6.701-2.494-11.512-8.928-11.512-16.545 0-9.715 7.875-17.59 17.59-17.59 6.583 0 12.316 3.62 15.338 8.981l27.048 19.815c6.725-.519 12.759-3.388 17.212-7.842 6.326-6.326 10.229-15.039 10.229-24.695 0-19.059-15.452-34.511-34.511-34.511-17.941 0-32.68 13.701-34.334 31.19L25.17 110.32c-3.044-18.708 1.83-37.433 13.015-52.121C52.236 38.424 72.5 28.333 94.5 28.333c17.489 0 33.632 5.547 46.855 14.955 13.595 9.644 24.109 23.291 29.975 39.268 3.039 8.279 4.67 17.148 4.67 26.361l-10.048 7.583z"/><path d="M142.092 73.932c-11.924 0-21.586 9.662-21.586 21.586s9.662 21.586 21.586 21.586 21.586-9.662 21.586-21.586-9.662-21.586-21.586-21.586zm.268 31.975c-5.723 0-10.356-4.634-10.356-10.356 0-5.723 4.634-10.356 10.356-10.356 5.723 0 10.356 4.634 10.356 10.356 0 5.722-4.633 10.356-10.356 10.356z"/></svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium">Steam</p>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm text-muted-foreground">{profile.connections.steam.id}</p>
                            <a href="#" className="text-blue-500 hover:text-blue-600">
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 sm:gap-8 text-sm">
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="font-semibold text-foreground text-lg">{profile.connections.steam.gamesCount}</p>
                          <p className="text-muted-foreground text-xs">Games</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="font-semibold text-foreground text-lg">{profile.connections.steam.achievementsCompleted}</p>
                          <p className="text-muted-foreground text-xs">Achievements</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="font-semibold text-foreground text-lg">{profile.connections.steam.totalPlaytime}</p>
                          <p className="text-muted-foreground text-xs">Hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Starknet Connection */}
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-worldrep-purple">
                          <svg width="24" height="24" fill="white" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M400 61.9275L84.5347 242.438V603.459L400 783.97L715.465 603.459V242.438L400 61.9275ZM656.232 242.438V558.045L400 693.322L143.768 558.045V242.438L400 107.161L656.232 242.438Z"/><path d="M400 467.854L491.039 415.481L400 363.107L308.961 415.481L400 467.854ZM431.662 550.809L582.074 467.854L431.662 384.899V550.809ZM368.338 384.899V550.809L217.926 467.854L368.338 384.899Z"/></svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium">Starknet</p>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-[200px]">
                              {profile.connections.starknet.address.substring(0, 8)}...
                              {profile.connections.starknet.address.substring(profile.connections.starknet.address.length - 6)}
                            </p>
                            <a href="#" className="text-blue-500 hover:text-blue-600">
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 sm:gap-8 text-sm">
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="font-semibold text-foreground text-lg">{profile.connections.starknet.gamesCount}</p>
                          <p className="text-muted-foreground text-xs">Games</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="font-semibold text-foreground text-lg">{profile.connections.starknet.achievementsCompleted}</p>
                          <p className="text-muted-foreground text-xs">Achievements</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <p className="font-semibold text-foreground text-lg">{profile.connections.starknet.totalPlaytime}</p>
                          <p className="text-muted-foreground text-xs">Hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Top Games */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Games</h2>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  View all <ChevronRight size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="games">
            <div className="pt-4">
              <h2 className="text-xl font-bold mb-4">Your Games Collection</h2>
              <p className="text-muted-foreground mb-6">Full games list coming soon...</p>
              
              {/* Placeholder for games tab */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...topGames, ...topGames].map((game, index) => (
                  <GameCard key={`${game.id}-${index}`} game={{...game, id: `${game.id}-${index}`}} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="pt-4 text-center p-8">
              <h2 className="text-xl font-bold mb-2">Achievements</h2>
              <p className="text-muted-foreground">Achievement tracking coming soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="pt-4 text-center p-8">
              <h2 className="text-xl font-bold mb-2">Detailed Stats</h2>
              <p className="text-muted-foreground">Advanced statistics coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;