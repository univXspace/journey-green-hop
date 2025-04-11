
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Bus, Train, MapPin, Calendar, Check } from "lucide-react";

export default function TripLogger() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [transportType, setTransportType] = useState("bus");
  const [distance, setDistance] = useState(5);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Recent trips (would be fetched from API in a real app)
  const [recentTrips, setRecentTrips] = useState([
    {
      id: 1,
      type: "bus",
      start: "Downtown Station",
      end: "Westside Mall",
      distance: 8.5,
      date: "2023-05-15",
      points: 8,
      co2Saved: 1.78
    },
    {
      id: 2,
      type: "metro",
      start: "Central Park",
      end: "University Campus",
      distance: 12.2,
      date: "2023-05-14",
      points: 12,
      co2Saved: 2.56
    }
  ]);
  
  const calculatePoints = (tripDistance: number) => {
    return Math.round(tripDistance);
  };
  
  const calculateCO2Saved = (tripDistance: number) => {
    // Assuming 0.21kg CO₂ saved per km compared to car
    return (tripDistance * 0.21).toFixed(2);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startLocation || !endLocation) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const points = calculatePoints(distance);
      const co2Saved = parseFloat(calculateCO2Saved(distance));
      
      // Add trip to recent trips
      const newTrip = {
        id: Date.now(),
        type: transportType,
        start: startLocation,
        end: endLocation,
        distance,
        date,
        points,
        co2Saved
      };
      
      setRecentTrips([newTrip, ...recentTrips]);
      
      toast({
        title: "Trip logged successfully!",
        description: `You earned ${points} points and saved ${co2Saved}kg of CO₂`,
      });
      
      // Reset form
      setStartLocation("");
      setEndLocation("");
      setDistance(5);
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log your trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Trip Logger</h1>
          <p className="mt-3 text-xl text-gray-600 max-w-3xl mx-auto">
            Log your eco-friendly commutes and earn points
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Log Trip Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Log a New Trip</CardTitle>
                <CardDescription>
                  Record your bus or metro trip details to earn rewards
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Transport Type */}
                  <div className="space-y-3">
                    <Label>Transport Type</Label>
                    <RadioGroup 
                      value={transportType} 
                      onValueChange={setTransportType}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bus" id="bus" />
                        <Label htmlFor="bus" className="flex items-center cursor-pointer">
                          <Bus className="h-5 w-5 mr-2 text-eco-green-600" />
                          Bus
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="metro" id="metro" />
                        <Label htmlFor="metro" className="flex items-center cursor-pointer">
                          <Train className="h-5 w-5 mr-2 text-eco-blue-600" />
                          Metro
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Start and End Locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="start-location">Start Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="start-location"
                          placeholder="Enter starting point"
                          className="pl-10"
                          value={startLocation}
                          onChange={(e) => setStartLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="end-location">End Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="end-location"
                          placeholder="Enter destination"
                          className="pl-10"
                          value={endLocation}
                          onChange={(e) => setEndLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Distance */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="distance">Distance (km)</Label>
                      <span className="text-sm font-medium">{distance} km</span>
                    </div>
                    <Slider
                      id="distance"
                      min={1}
                      max={50}
                      step={0.5}
                      value={[distance]}
                      onValueChange={(values) => setDistance(values[0])}
                      className={transportType === "bus" ? "bg-eco-green-100" : "bg-eco-blue-100"}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 km</span>
                      <span>50 km</span>
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="space-y-3">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Trip Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Trip Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Points to Earn</p>
                        <p className="text-lg font-medium text-eco-green-600">
                          {calculatePoints(distance)} points
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">CO₂ Saved</p>
                        <p className="text-lg font-medium text-eco-green-600">
                          {calculateCO2Saved(distance)} kg
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className={`w-full ${
                      transportType === "bus" 
                        ? "bg-eco-green-600 hover:bg-eco-green-700" 
                        : "bg-eco-blue-600 hover:bg-eco-blue-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging Trip..." : "Log Trip"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          {/* Recent Trips */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>
                  Your latest eco-friendly journeys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.length > 0 ? (
                    recentTrips.map((trip) => (
                      <div key={trip.id} className="flex gap-4 p-3 rounded-lg border">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          trip.type === "bus" ? "bg-eco-green-100" : "bg-eco-blue-100"
                        }`}>
                          {trip.type === "bus" ? (
                            <Bus className="h-5 w-5 text-eco-green-600" />
                          ) : (
                            <Train className="h-5 w-5 text-eco-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-gray-900 truncate">
                              {trip.start} → {trip.end}
                            </h4>
                            <span className="text-xs text-gray-500">{trip.date}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{trip.distance} km</span>
                            <div className="flex items-center">
                              <span className="bg-eco-green-100 text-eco-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                +{trip.points} pts
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No trips logged yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
