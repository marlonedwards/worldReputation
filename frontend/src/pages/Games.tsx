
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameCard, Game } from "@/components/dashboard/GameCard";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data for games
const popularGames: Game[] = [
  {
    id: "1",
    title: "Dota 2",
    platform: "steam",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    hoursPlayed: 342,
    lastPlayed: "2025-05-10T12:00:00Z",
    achievements: { completed: 68, total: 167 }
  },
  {
    id: "2",
    title: "Counter-Strike 2",
    platform: "steam",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    hoursPlayed: 156,
    lastPlayed: "2025-05-08T22:30:00Z",
    achievements: { completed: 24, total: 167 }
  },
  {
    id: "3",
    title: "Starknet Heroes",
    platform: "starknet",
    image: "https://placehold.co/600x400/333/eee?text=Starknet+Heroes",
    hoursPlayed: 48,
    lastPlayed: "2025-05-12T18:45:00Z",
    achievements: { completed: 12, total: 25 }
  },
  {
    id: "4",
    title: "Influence",
    platform: "both",
    image: "https://placehold.co/600x400/333/eee?text=Influence",
    hoursPlayed: 87,
    lastPlayed: "2025-05-11T14:20:00Z",
    achievements: { completed: 32, total: 72 }
  },
];

const friendsGames: Game[] = [
  {
    id: "5",
    title: "Apex Legends",
    platform: "steam",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
    hoursPlayed: 210,
    lastPlayed: "2025-05-10T19:15:00Z",
    achievements: { completed: 32, total: 102 }
  },
  {
    id: "6",
    title: "Eternal Dragons",
    platform: "starknet",
    image: "https://placehold.co/600x400/333/eee?text=Eternal+Dragons",
    hoursPlayed: 65,
    lastPlayed: "2025-05-12T08:45:00Z",
    achievements: { completed: 18, total: 40 }
  },
];

const myGames: Game[] = [
  ...popularGames.slice(0, 2),
  ...friendsGames.slice(0, 1)
];

export default function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple search function to filter through all games
    const allGames = [...popularGames, ...friendsGames];
    const filtered = allGames.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    setHasSearched(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Games</h2>
            <p className="text-muted-foreground">
              Discover new games, connect your accounts, and track your gaming journey
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search games..."
                className="w-full md:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {searchResults.length} games matching "{searchQuery}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {searchResults.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-medium mb-2">Can't find what you're looking for?</h3>
                  <p className="text-muted-foreground mb-4">The game might not be indexed yet.</p>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to my library
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a new game</DialogTitle>
                        <DialogDescription>
                          Add a game to your library to start tracking your progress
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="game-name">Game name</Label>
                          <Input id="game-name" placeholder="Enter game name..." />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="game-platform">Platform</Label>
                          <select id="game-platform" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="steam">Steam</option>
                            <option value="starknet">Starknet</option>
                            <option value="both">Both</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Submit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="friends">Friends Playing</TabsTrigger>
            <TabsTrigger value="my-games">My Games</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Popular Games</CardTitle>
                <CardDescription>Trending games across Steam and Starknet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {popularGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>New Web3 Games</CardTitle>
                <CardDescription>Recently launched games on Starknet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {popularGames
                    .filter(g => g.platform === "starknet" || g.platform === "both")
                    .map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="friends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Friends Are Playing</CardTitle>
                <CardDescription>Games popular among your connections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {friendsGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-games" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Library</CardTitle>
                <CardDescription>Games you've played or added to your collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {myGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
