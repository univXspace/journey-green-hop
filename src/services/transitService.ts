
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
    
    console.log("Fetching transit routes for:", origin, "to", destination);
    
    // Simulated response for demonstration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const routes = generateMockTransitRoutes(origin, destination);
    console.log("Generated routes:", routes);
    return routes;
  } catch (error) {
    console.error("Error fetching transit routes:", error);
    throw new Error("Failed to fetch transit routes. Please try again.");
  }
};

// Mock data generator for demonstration
const generateMockTransitRoutes = (start: string, end: string): TransitRoute[] => {
  // Generate random distances that will be somewhat proportional to real distances
  const baseDistance = Math.floor(Math.random() * 10) + 5; // 5-15 km
  
  const busRoute: TransitRoute = {
    duration: Math.floor(Math.random() * 30) + 20, // 20-50 minutes
    distance: baseDistance * 1.2, // slightly longer for bus
    startAddress: start,
    endAddress: end,
    totalCo2Saved: 0,
    steps: [
      {
        type: "bus",
        distance: baseDistance * 1.2,
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
    distance: baseDistance * 0.9, // slightly shorter for metro
    startAddress: start,
    endAddress: end,
    totalCo2Saved: 0,
    steps: [
      {
        type: "metro",
        distance: baseDistance * 0.9,
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
    distance: baseDistance * 1.1, // mixed route might have transfers
    startAddress: start,
    endAddress: end,
    totalCo2Saved: 0,
    steps: [
      {
        type: "bus",
        distance: (baseDistance * 1.1) * 0.4, // 40% of journey by bus
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
        distance: (baseDistance * 1.1) * 0.6, // 60% of journey by metro
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

// Calculate total CO2 saved across all user trips
export const calculateTotalCO2Saved = (trips: any[]): number => {
  if (!trips || trips.length === 0) return 0;
  return trips.reduce((total, trip) => total + (trip.co2Saved || 0), 0);
};
