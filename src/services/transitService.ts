
import { TransitRoute, TransitStep, TransportType } from "@/types";

// This would typically be fetched from an environment variable
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

export const fetchTransitRoutes = async (
  origin: string,
  destination: string
): Promise<TransitRoute[]> => {
  try {
    // For demo purposes, we'll simulate API response with dummy data
    // In a real app, you would make an actual API call:
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    //     origin
    //   )}&destination=${encodeURIComponent(
    //     destination
    //   )}&mode=transit&alternatives=true&key=${GOOGLE_MAPS_API_KEY}`
    // );
    // const data = await response.json();
    
    // Simulated response for demonstration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return generateMockTransitRoutes(origin, destination);
  } catch (error) {
    console.error("Error fetching transit routes:", error);
    throw new Error("Failed to fetch transit routes. Please try again.");
  }
};

// Mock data generator for demonstration
const generateMockTransitRoutes = (start: string, end: string): TransitRoute[] => {
  const busRoute: TransitRoute = {
    duration: Math.floor(Math.random() * 30) + 20, // 20-50 minutes
    distance: Math.floor(Math.random() * 10) + 5, // 5-15 km
    startAddress: start,
    endAddress: end,
    totalCo2Saved: 0,
    steps: [
      {
        type: "bus",
        distance: Math.floor(Math.random() * 5) + 3,
        duration: Math.floor(Math.random() * 15) + 10,
        startLocation: `${start} Bus Stop`,
        endLocation: `${end} Bus Terminal`,
        instructions: "Take the 42 bus towards Downtown",
        transitDetails: {
          line: "42 - Downtown Express",
          departureTime: new Date(Date.now() + 5 * 60000).toLocaleTimeString(),
          arrivalTime: new Date(Date.now() + 35 * 60000).toLocaleTimeString(),
          numStops: 8
        }
      }
    ]
  };
  
  const metroRoute: TransitRoute = {
    duration: Math.floor(Math.random() * 20) + 15, // 15-35 minutes
    distance: Math.floor(Math.random() * 8) + 4, // 4-12 km
    startAddress: start,
    endAddress: end,
    totalCo2Saved: 0,
    steps: [
      {
        type: "metro",
        distance: Math.floor(Math.random() * 4) + 2,
        duration: Math.floor(Math.random() * 10) + 5,
        startLocation: `${start} Metro Station`,
        endLocation: `${end} Metro Station`,
        instructions: "Take the Blue Line towards City Center",
        transitDetails: {
          line: "Blue Line",
          departureTime: new Date(Date.now() + 3 * 60000).toLocaleTimeString(),
          arrivalTime: new Date(Date.now() + 25 * 60000).toLocaleTimeString(),
          numStops: 5
        }
      }
    ]
  };
  
  const mixedRoute: TransitRoute = {
    duration: Math.floor(Math.random() * 40) + 25, // 25-65 minutes
    distance: Math.floor(Math.random() * 12) + 6, // 6-18 km
    startAddress: start,
    endAddress: end,
    totalCo2Saved: 0,
    steps: [
      {
        type: "bus",
        distance: Math.floor(Math.random() * 3) + 1,
        duration: Math.floor(Math.random() * 10) + 5,
        startLocation: `${start} Bus Stop`,
        endLocation: "Transfer Station",
        instructions: "Take the 15 bus towards Transfer Station",
        transitDetails: {
          line: "15 - Local",
          departureTime: new Date(Date.now() + 2 * 60000).toLocaleTimeString(),
          arrivalTime: new Date(Date.now() + 15 * 60000).toLocaleTimeString(),
          numStops: 3
        }
      },
      {
        type: "metro",
        distance: Math.floor(Math.random() * 6) + 3,
        duration: Math.floor(Math.random() * 15) + 10,
        startLocation: "Transfer Station",
        endLocation: `${end} Metro Station`,
        instructions: "Take the Red Line towards Eastside",
        transitDetails: {
          line: "Red Line",
          departureTime: new Date(Date.now() + 18 * 60000).toLocaleTimeString(),
          arrivalTime: new Date(Date.now() + 40 * 60000).toLocaleTimeString(),
          numStops: 7
        }
      }
    ]
  };
  
  // Calculate CO2 saved (0.21kg per km)
  busRoute.totalCo2Saved = parseFloat((busRoute.distance * 0.21).toFixed(2));
  metroRoute.totalCo2Saved = parseFloat((metroRoute.distance * 0.21).toFixed(2));
  mixedRoute.totalCo2Saved = parseFloat((mixedRoute.distance * 0.21).toFixed(2));
  
  console.log("Generated routes:", [busRoute, metroRoute, mixedRoute]);
  return [busRoute, metroRoute, mixedRoute];
};

export const getTransportTypeIcon = (type: TransportType) => {
  return type === "bus" ? "🚌" : "🚇";
};
