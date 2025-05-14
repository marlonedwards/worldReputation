
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Connect = () => {
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Authentication email sent",
        description: "Please check your inbox to continue",
      });
      setLoading(false);
    }, 1500);
  };
  
  const handleConnectSteam = () => {
    // In a real app, this would redirect to Steam auth
    toast({
      title: "Connecting to Steam",
      description: "You'll be redirected to Steam to authorize",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Connect to worldRep</h1>
          <p className="text-muted-foreground">
            Choose your preferred authentication method
          </p>
        </div>
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="steam">Steam</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Authentication</CardTitle>
                <CardDescription>
                  Sign in with your email to create or access your worldRep profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailAuth}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Continue with Email"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  We'll send you a secure authentication link to your email.
                  No password needed!
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-worldrep-purple/20 to-transparent"></div>
              <CardHeader>
                <CardTitle>Connect Wallet</CardTitle>
                <CardDescription>
                  Connect with your Starknet wallet for a seamless gaming experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-card rounded-lg border flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-worldrep-purple">
                    <svg width="20" height="20" fill="white" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M400 61.9275L84.5347 242.438V603.459L400 783.97L715.465 603.459V242.438L400 61.9275ZM656.232 242.438V558.045L400 693.322L143.768 558.045V242.438L400 107.161L656.232 242.438Z"/><path d="M400 467.854L491.039 415.481L400 363.107L308.961 415.481L400 467.854ZM431.662 550.809L582.074 467.854L431.662 384.899V550.809ZM368.338 384.899V550.809L217.926 467.854L368.338 384.899Z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Argent</p>
                    <p className="text-sm text-muted-foreground">Connect with Argent wallet</p>
                  </div>
                  <Button>Connect</Button>
                </div>
                
                <div className="p-3 bg-card rounded-lg border flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#101010]">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.72 4.093l3.74.692v7.043l4.827-2.233v-7.04l3.731.691V17.275l-3.73-.691v-7.046l-4.828 2.233v7.045l-3.73-.692V4.093ZM5 3L22 6.771v11.213L5 21V3Z" fillRule="evenodd" clipRule="evenodd"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Braavos</p>
                    <p className="text-sm text-muted-foreground">Connect with Braavos wallet</p>
                  </div>
                  <Button>Connect</Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  A self-custodial wallet will be created behind the scenes
                  to store your gaming credentials securely on Starknet.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="steam">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b2838]/20 to-transparent"></div>
              <CardHeader>
                <CardTitle>Connect Steam</CardTitle>
                <CardDescription>
                  Link your Steam account to import your gaming data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#1b2838] mb-4">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233 233" fill="#fff"><path d="M104.515 105.554c-6.8 0-12.593 4.179-14.964 10.095l6.359 2.641c1.584-3.325 4.962-5.619 8.873-5.619 5.417 0 9.805 4.388 9.805 9.805 0 5.417-4.388 9.805-9.805 9.805-.215 0-.428-.008-.638-.023l-6.554-2.683c2.054 5.392 7.277 9.222 13.425 9.222 7.922 0 14.342-6.421 14.342-14.342s-6.421-14.341-14.342-14.341-7.001-4.561-6.501-4.561z"/><path d="M116.5 0C52.13 0 0 52.13 0 116.5S52.13 233 116.5 233 233 180.87 233 116.5 180.87 0 116.5 0zm49.452 116.5c0 14.438-11.729 26.167-26.167 26.167-1.375 0-2.723-.116-4.043-.324l-13.516 9.685c.037.549.075 1.1.075 1.657 0 13.382-10.846 24.229-24.229 24.229s-24.229-10.846-24.229-24.229c0-1.864.22-3.677.617-5.419L47.842 131.21c-6.701-2.494-11.512-8.928-11.512-16.545 0-9.715 7.875-17.59 17.59-17.59 6.583 0 12.316 3.62 15.338 8.981l27.048 19.815c6.725-.519 12.759-3.388 17.212-7.842 6.326-6.326 10.229-15.039 10.229-24.695 0-19.059-15.452-34.511-34.511-34.511-17.941 0-32.68 13.701-34.334 31.19L25.17 110.32c-3.044-18.708 1.83-37.433 13.015-52.121C52.236 38.424 72.5 28.333 94.5 28.333c17.489 0 33.632 5.547 46.855 14.955 13.595 9.644 24.109 23.291 29.975 39.268 3.039 8.279 4.67 17.148 4.67 26.361l-10.048 7.583z"/><path d="M142.092 73.932c-11.924 0-21.586 9.662-21.586 21.586s9.662 21.586 21.586 21.586 21.586-9.662 21.586-21.586-9.662-21.586-21.586-21.586zm.268 31.975c-5.723 0-10.356-4.634-10.356-10.356 0-5.723 4.634-10.356 10.356-10.356 5.723 0 10.356 4.634 10.356 10.356 0 5.722-4.633 10.356-10.356 10.356z"/></svg>
                  </div>
                  
                  <div className="space-y-3 text-center">
                    <h3 className="font-medium">Import your gaming history</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      Connect your Steam account to automatically import your game library,
                      achievements, and playtime statistics.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={handleConnectSteam} className="bg-[#1b2838] hover:bg-[#2a3f5a] min-w-[200px]">
                  Connect Steam Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Connect;
