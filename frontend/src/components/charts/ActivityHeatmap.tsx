import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  className?: string;
}

export interface DayActivity {
  date: string; // ISO date string
  value: number; // Activity level (0-4)
  games?: string[];
  hours?: number;
}

export function ActivityHeatmap({ className }: ActivityHeatmapProps) {
  const [data, setData] = useState<DayActivity[]>([]);
  const [tooltipData, setTooltipData] = useState<DayActivity | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const heatmapRef = useRef<HTMLDivElement>(null);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["", "Mon", "", "Wed", "", "Fri", ""];

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulating API call - in production, replace with actual API fetch
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create a year's worth of realistic data
        const activityData = generateRealData();
        setData(activityData);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to generate realistic data based on typical gaming patterns
  const generateRealData = (): DayActivity[] => {
    const result: DayActivity[] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365); // Go back 365 days
    
    // Common games with weighted probability
    const gamePool = [
      { name: "Dota 2", weight: 0.4 },
      { name: "Counter-Strike 2", weight: 0.3 },
      { name: "Influence", weight: 0.15 },
      { name: "Eternal Dragons", weight: 0.1 },
      { name: "Starknet Heroes", weight: 0.05 }
    ];
    
    // Create patterns - more activity on weekends, occasional bursts for new games
    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 6 is Saturday
      
      // Weekend boost
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Special event boosts (random bursts of activity)
      const specialEventBoost = Math.random() > 0.92;
      
      // Seasonal variations (more gaming in winter months)
      const month = currentDate.getMonth();
      const winterBoost = (month === 11 || month === 0 || month === 1) ? 0.2 : 0;
      
      // Calculate base probability of playing on this day
      let playProbability = 0.6; // base chance
      if (isWeekend) playProbability += 0.25;
      if (specialEventBoost) playProbability += 0.3;
      playProbability += winterBoost;
      
      // Determine if played this day
      const played = Math.random() < playProbability;
      
      if (played) {
        // Determine activity level (1-4)
        let baseValue = isWeekend ? 2 : 1;
        if (specialEventBoost) baseValue += 1;
        
        // Add some randomness
        const randomFactor = Math.floor(Math.random() * 2);
        let value = Math.min(baseValue + randomFactor, 4);
        
        // Select games played
        const gamesPlayed: string[] = [];
        const numGames = Math.floor(Math.random() * 2) + 1; // 1-2 games per day
        
        // Select weighted random games
        const availableGames = [...gamePool];
        for (let j = 0; j < numGames; j++) {
          if (availableGames.length > 0) {
            const totalWeight = availableGames.reduce((sum, game) => sum + game.weight, 0);
            let random = Math.random() * totalWeight;
            
            for (let k = 0; k < availableGames.length; k++) {
              random -= availableGames[k].weight;
              if (random <= 0) {
                gamesPlayed.push(availableGames[k].name);
                availableGames.splice(k, 1); // Remove selected game
                break;
              }
            }
          }
        }
        
        // Calculate hours played based on activity level
        const hoursBase = value * 1.5;
        const hours = Math.round((hoursBase + Math.random() * 2) * 10) / 10;
        
        result.push({
          date: currentDate.toISOString().split('T')[0],
          value,
          games: gamesPlayed,
          hours
        });
      } else {
        // No activity day
        result.push({
          date: currentDate.toISOString().split('T')[0],
          value: 0
        });
      }
    }
    
    return result;
  };

  // Group data by weeks for rendering
  const getWeeksGrid = () => {
    // Create a 53x7 grid for the entire year
    const weeks: (DayActivity | null)[][] = Array(53).fill(null).map(() => Array(7).fill(null));
    
    if (data.length === 0) return weeks;
    
    // First date in our dataset
    const firstDate = new Date(data[0].date);
    // Get the day of week for the first date (0 = Sunday, 1 = Monday, ...)
    const firstDayOfWeek = firstDate.getDay();
    // Convert to Monday-first format (0 = Monday, 6 = Sunday)
    const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Fill the calendar grid
    data.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay(); // 0-6 (Sun-Sat)
      // Convert to Mon-Sun format (0-6)
      const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const weekIndex = Math.floor((index + adjustedFirstDay) / 7);
      
      if (weekIndex < 53) {
        weeks[weekIndex][adjustedDayOfWeek] = day;
      }
    });
    
    return weeks;
  };

  // Improved month label calculation
  const getMonthLabels = () => {
    if (data.length === 0) return [];
    
    // Sort data by date first
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const monthPositions: { month: number, weekIndex: number }[] = [];
    const weeks = getWeeksGrid();
    
    // For each day in our dataset
    sortedData.forEach(day => {
      const date = new Date(day.date);
      const month = date.getMonth();
      const dayOfMonth = date.getDate();
      
      // Only consider the 1st day of each month
      if (dayOfMonth === 1) {
        // Find which week this day is in
        for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
          const dayInWeek = weeks[weekIndex].find(d => 
            d && d.date === day.date
          );
          
          if (dayInWeek) {
            // If we don't already have this month recorded
            if (!monthPositions.some(pos => pos.month === month)) {
              monthPositions.push({ month, weekIndex });
            }
            break;
          }
        }
      }
    });
    
    // Create final month labels with proper spacing
    return monthPositions.map(pos => ({
      name: monthNames[pos.month],
      position: pos.weekIndex
    }));
  };

  const getActivityColor = (value: number | undefined) => {
    if (value === undefined || value === 0) return "bg-[#161b22]"; // Empty cell
    
    // GitHub-style color scale
    const colors = [
      "bg-[#161b22]", // No activity (level 0)
      "bg-[#0e4429]", // Light activity (level 1)
      "bg-[#006d32]", // Medium activity (level 2)
      "bg-[#26a641]", // High activity (level 3)
      "bg-[#39d353]", // Very high activity (level 4)
    ];
    
    return colors[value] || colors[0];
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const renderTooltip = (day: DayActivity) => {
    if (!day) return null;
    
    return (
      <div className="bg-background p-3 rounded-md shadow-lg border border-border text-left max-w-[200px] z-50">
        <p className="font-medium text-primary">{formatDate(day.date)}</p>
        {day.value > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{day.hours} hours played</p>
            {day.games && day.games.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium mb-1">Games played:</p>
                {day.games.map((game) => (
                  <div key={game} className="text-xs mb-1 px-2 py-1 bg-muted rounded-full inline-block mr-1">
                    {game}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">No activity</p>
        )}
      </div>
    );
  };

  const weeks = getWeeksGrid();
  const monthLabels = getMonthLabels();
  
  // GitHub-style display
  const CELL_SIZE = 10; // Size in px of each day cell
  const CELL_MARGIN = 2; // Margin between cells 
  const LABEL_WIDTH = 30; // Width for the day labels column
  const WEEK_WIDTH = CELL_SIZE + CELL_MARGIN; // Width of a week column

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Gaming Activity</span>
          <div className="flex items-center text-xs space-x-2">
            <span className="text-muted-foreground">Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div 
                  key={level}
                  className={cn(
                    "h-3 w-3 rounded-sm",
                    getActivityColor(level)
                  )}
                />
              ))}
            </div>
            <span className="text-muted-foreground">More</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6 relative">
        {isLoading ? (
          <div className="h-[130px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading activity data...</div>
          </div>
        ) : (
          <div className="relative" ref={heatmapRef}>
            {/* Month labels row */}
            <div 
              className="flex text-xs text-muted-foreground mb-1 relative h-5"
              style={{ paddingLeft: LABEL_WIDTH + "px" }}
            >
              {monthLabels.map((month, idx) => (
                <div 
                  key={`${month.name}-${idx}`} 
                  className="absolute text-left"
                  style={{ 
                    left: `${month.position * WEEK_WIDTH + LABEL_WIDTH}px`
                  }} 
                >
                  {month.name}
                </div>
              ))}
            </div>
            
            <div className="relative flex">
              {/* Day labels column */}
              <div 
                className="flex flex-col justify-between pr-2 py-1"
                style={{ 
                  width: LABEL_WIDTH + "px",
                  height: (CELL_SIZE + CELL_MARGIN) * 7 + "px"
                }}
              >
                {dayNames.map((day, idx) => (
                  <span key={idx} className="text-xs text-muted-foreground">
                    {day}
                  </span>
                ))}
              </div>
              
              {/* Calendar cells grid */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex min-w-max">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col" style={{ marginRight: CELL_MARGIN + "px" }}>
                      {week.map((day, dayIdx) => (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className={cn(
                            "rounded-sm cursor-pointer transition-all duration-200",
                            getActivityColor(day?.value),
                            "hover:ring-1 hover:ring-offset-1 hover:ring-offset-background hover:ring-foreground"
                          )}
                          style={{ 
                            width: CELL_SIZE + "px", 
                            height: CELL_SIZE + "px",
                            marginBottom: CELL_MARGIN + "px"
                          }}
                          onMouseEnter={(e) => {
                            if (day) {
                              setTooltipData(day);
                              setTooltipPos({
                                x: e.clientX,
                                y: e.clientY
                              });
                            }
                          }}
                          onMouseLeave={() => setTooltipData(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tooltip */}
            {tooltipData && (
              <div 
                className="fixed z-50 pointer-events-none"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y - 20}px`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                {renderTooltip(tooltipData)}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}