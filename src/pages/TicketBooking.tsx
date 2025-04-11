// Updated metro routes based on https://mahametropune-alpha.billeasy.in/

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { TransportType, Ticket } from "@/types";
import { Bus, Train, MapPin, Calendar, Clock, CreditCard, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TicketBooking() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TransportType>("bus");

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("09:00");
  const [ticketType, setTicketType] = useState("single");

  // Updated ticket options in INR and real locations
  const busRoutes = [
    { id: "B1", name: "Swargate - Hadapsar", price: 30 },
    { id: "B2", name: "Katraj - Shivajinagar", price: 25 },
    { id: "B3", name: "Airport Shuttle", price: 50 },
  ];

  const metroRoutes = [
    { id: "M1", name: "Purple Line (PCMC - Swargate)", price: 25 },
    { id: "M2", name: "Aqua Line (Vanaz - Ramwadi)", price: 20 },
    { id: "M3", name: "Line 3 (Civil Court - Megapolis, Under Construction)", price: 30 },
  ];

  const [selectedRoute, setSelectedRoute] = useState(activeTab === "bus" ? busRoutes[0].id : metroRoutes[0].id);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const handleRouteChange = (value: string) => {
    setSelectedRoute(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromLocation || !toLocation) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const routes = activeTab === "bus" ? busRoutes : metroRoutes;
      const selectedOption = routes.find(route => route.id === selectedRoute);

      if (!selectedOption) throw new Error("Invalid route selected");

      const basePrice = selectedOption.price;
      const price = basePrice * (ticketType === "return" ? 1.8 : 1);
      const points = Math.round(price);
      const estimatedDistance = 8;
      const co2Saved = parseFloat((estimatedDistance * 0.21).toFixed(2));

      const newTicket: Ticket = {
        id: Date.now(),
        userId: "user123",
        type: activeTab,
        from: fromLocation,
        to: toLocation,
        date,
        departureTime: time,
        price,
        points,
        co2Saved,
        status: "active",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + Date.now()
      };

      setTicket(newTicket);
      setShowSuccess(true);
      setFromLocation("");
      setToLocation("");
      setDate(new Date().toISOString().split('T')[0]);
      setTime("09:00");

    } catch (error) {
      toast({ title: "Error", description: "Failed to book your ticket. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // The rest of the component remains the same – update UI labels to display ₹ instead of $
  // Example: {route.name} (₹{route.price})
  // and update the Price Summary similarly

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ... Rest of the JSX remains the same but with ₹ instead of $ wherever applicable ... */}
    </div>
  );
}

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { Navbar } from "@/components/Navbar";
// import { TransportType, Ticket } from "@/types";
// import { Bus, Train, MapPin, Calendar, Clock, CreditCard, QrCode } from "lucide-react";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// export default function TicketBooking() {
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState<TransportType>("bus");
  
//   // Form state
//   const [fromLocation, setFromLocation] = useState("");
//   const [toLocation, setToLocation] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [time, setTime] = useState("09:00");
//   const [ticketType, setTicketType] = useState("single");
  
//   // Mock ticket options
//   const busRoutes = [
//     { id: "B1", name: "Downtown Line", price: 2.5 },
//     { id: "B2", name: "Westside Express", price: 3.0 },
//     { id: "B3", name: "Airport Shuttle", price: 5.0 },
//   ];
  
//   const metroRoutes = [
//     { id: "M1", name: "Red Line", price: 2.8 },
//     { id: "M2", name: "Blue Line", price: 2.8 },
//     { id: "M3", name: "Green Line", price: 3.2 },
//   ];

//   const [selectedRoute, setSelectedRoute] = useState(activeTab === "bus" ? busRoutes[0].id : metroRoutes[0].id);
  
//   // Success dialog
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [ticket, setTicket] = useState<Ticket | null>(null);
  
//   const handleRouteChange = (value: string) => {
//     setSelectedRoute(value);
//   };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!fromLocation || !toLocation) {
//       toast({
//         title: "Missing information",
//         description: "Please fill in all fields",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const routes = activeTab === "bus" ? busRoutes : metroRoutes;
//       const selectedOption = routes.find(route => route.id === selectedRoute);
      
//       if (!selectedOption) {
//         throw new Error("Invalid route selected");
//       }
      
//       // Calculate points (1 point per $1 spent)
//       const price = selectedOption.price * (ticketType === "return" ? 1.8 : 1);
//       const points = Math.round(price);
      
//       // Estimate CO2 saved (roughly 0.21kg per km, assuming average 8km for this example)
//       const estimatedDistance = 8;
//       const co2Saved = parseFloat((estimatedDistance * 0.21).toFixed(2));
      
//       // Create ticket
//       const newTicket: Ticket = {
//         id: Date.now(),
//         userId: "user123", // This would come from auth in a real app
//         type: activeTab,
//         from: fromLocation,
//         to: toLocation,
//         date,
//         departureTime: time,
//         price,
//         points,
//         co2Saved,
//         status: "active",
//         qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + Date.now()
//       };
      
//       setTicket(newTicket);
//       setShowSuccess(true);
      
//       // Reset form
//       setFromLocation("");
//       setToLocation("");
//       setDate(new Date().toISOString().split('T')[0]);
//       setTime("09:00");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to book your ticket. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-bold text-gray-900">Book a Ticket</h1>
//           <p className="mt-3 text-xl text-gray-600 max-w-3xl mx-auto">
//             Purchase eco-friendly transport tickets and earn points
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Ticket Booking Form */}
//           <div className="md:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Book Your Ticket</CardTitle>
//                 <CardDescription>
//                   Choose your transport mode and details
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Tabs value={activeTab} onValueChange={(value: TransportType) => setActiveTab(value)} className="w-full">
//                   <TabsList className="grid grid-cols-2 mb-6">
//                     <TabsTrigger value="bus" className="flex items-center">
//                       <Bus className="mr-2 h-4 w-4" />
//                       Bus
//                     </TabsTrigger>
//                     <TabsTrigger value="metro" className="flex items-center">
//                       <Train className="mr-2 h-4 w-4" />
//                       Metro
//                     </TabsTrigger>
//                   </TabsList>
                  
//                   {/* Bus Tab */}
//                   <TabsContent value="bus">
//                     <form onSubmit={handleSubmit}>
//                       <div className="space-y-6">
//                         {/* Route Selection */}
//                         <div className="space-y-3">
//                           <Label htmlFor="bus-route">Select Route</Label>
//                           <Select
//                             value={selectedRoute}
//                             onValueChange={handleRouteChange}
//                           >
//                             <SelectTrigger id="bus-route" className="w-full">
//                               <SelectValue placeholder="Select a bus route" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {busRoutes.map(route => (
//                                 <SelectItem key={route.id} value={route.id}>
//                                   {route.name} (${route.price})
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
                        
//                         {/* From and To Locations */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-3">
//                             <Label htmlFor="from-location">From</Label>
//                             <div className="relative">
//                               <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="from-location"
//                                 placeholder="Enter starting point"
//                                 className="pl-10"
//                                 value={fromLocation}
//                                 onChange={(e) => setFromLocation(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                           <div className="space-y-3">
//                             <Label htmlFor="to-location">To</Label>
//                             <div className="relative">
//                               <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="to-location"
//                                 placeholder="Enter destination"
//                                 className="pl-10"
//                                 value={toLocation}
//                                 onChange={(e) => setToLocation(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Date and Time */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-3">
//                             <Label htmlFor="date">Date</Label>
//                             <div className="relative">
//                               <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="date"
//                                 type="date"
//                                 className="pl-10"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                           <div className="space-y-3">
//                             <Label htmlFor="time">Departure Time</Label>
//                             <div className="relative">
//                               <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="time"
//                                 type="time"
//                                 className="pl-10"
//                                 value={time}
//                                 onChange={(e) => setTime(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Ticket Type */}
//                         <div className="space-y-3">
//                           <Label>Ticket Type</Label>
//                           <RadioGroup value={ticketType} onValueChange={setTicketType} className="flex space-x-4">
//                             <div className="flex items-center space-x-2">
//                               <RadioGroupItem value="single" id="single" />
//                               <Label htmlFor="single">Single</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <RadioGroupItem value="return" id="return" />
//                               <Label htmlFor="return">Return (10% discount)</Label>
//                             </div>
//                           </RadioGroup>
//                         </div>
                        
//                         {/* Price Summary */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <h4 className="font-medium text-gray-900 mb-2">Price Summary</h4>
//                           <div className="space-y-2">
//                             {busRoutes.find(route => route.id === selectedRoute) && (
//                               <>
//                                 <div className="flex justify-between">
//                                   <span>Base Fare</span>
//                                   <span>${busRoutes.find(route => route.id === selectedRoute)?.price.toFixed(2)}</span>
//                                 </div>
//                                 {ticketType === "return" && (
//                                   <div className="flex justify-between text-eco-green-600">
//                                     <span>Return Discount</span>
//                                     <span>-10%</span>
//                                   </div>
//                                 )}
//                                 <div className="border-t pt-2 flex justify-between font-medium">
//                                   <span>Total</span>
//                                   <span>
//                                     ${(busRoutes.find(route => route.id === selectedRoute)?.price || 0 * (ticketType === "return" ? 1.8 : 1)).toFixed(2)}
//                                   </span>
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="mt-6">
//                         <Button 
//                           type="submit" 
//                           className="w-full bg-eco-green-600 hover:bg-eco-green-700"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? "Processing..." : "Purchase Ticket"}
//                           <CreditCard className="ml-2 h-4 w-4" />
//                         </Button>
//                       </div>
//                     </form>
//                   </TabsContent>
                  
//                   {/* Metro Tab - Similar to Bus Tab with different routes */}
//                   <TabsContent value="metro">
//                     <form onSubmit={handleSubmit}>
//                       <div className="space-y-6">
//                         {/* Route Selection */}
//                         <div className="space-y-3">
//                           <Label htmlFor="metro-route">Select Route</Label>
//                           <Select
//                             value={selectedRoute}
//                             onValueChange={handleRouteChange}
//                           >
//                             <SelectTrigger id="metro-route" className="w-full">
//                               <SelectValue placeholder="Select a metro line" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {metroRoutes.map(route => (
//                                 <SelectItem key={route.id} value={route.id}>
//                                   {route.name} (${route.price})
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
                        
//                         {/* From and To Locations */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-3">
//                             <Label htmlFor="from-location">From</Label>
//                             <div className="relative">
//                               <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="from-location"
//                                 placeholder="Enter starting station"
//                                 className="pl-10"
//                                 value={fromLocation}
//                                 onChange={(e) => setFromLocation(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                           <div className="space-y-3">
//                             <Label htmlFor="to-location">To</Label>
//                             <div className="relative">
//                               <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="to-location"
//                                 placeholder="Enter destination station"
//                                 className="pl-10"
//                                 value={toLocation}
//                                 onChange={(e) => setToLocation(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Date and Time */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-3">
//                             <Label htmlFor="date">Date</Label>
//                             <div className="relative">
//                               <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="date"
//                                 type="date"
//                                 className="pl-10"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                           <div className="space-y-3">
//                             <Label htmlFor="time">Departure Time</Label>
//                             <div className="relative">
//                               <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 id="time"
//                                 type="time"
//                                 className="pl-10"
//                                 value={time}
//                                 onChange={(e) => setTime(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Ticket Type */}
//                         <div className="space-y-3">
//                           <Label>Ticket Type</Label>
//                           <RadioGroup value={ticketType} onValueChange={setTicketType} className="flex space-x-4">
//                             <div className="flex items-center space-x-2">
//                               <RadioGroupItem value="single" id="single" />
//                               <Label htmlFor="single">Single</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <RadioGroupItem value="return" id="return" />
//                               <Label htmlFor="return">Return (10% discount)</Label>
//                             </div>
//                           </RadioGroup>
//                         </div>
                        
//                         {/* Price Summary */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <h4 className="font-medium text-gray-900 mb-2">Price Summary</h4>
//                           <div className="space-y-2">
//                             {metroRoutes.find(route => route.id === selectedRoute) && (
//                               <>
//                                 <div className="flex justify-between">
//                                   <span>Base Fare</span>
//                                   <span>${metroRoutes.find(route => route.id === selectedRoute)?.price.toFixed(2)}</span>
//                                 </div>
//                                 {ticketType === "return" && (
//                                   <div className="flex justify-between text-eco-green-600">
//                                     <span>Return Discount</span>
//                                     <span>-10%</span>
//                                   </div>
//                                 )}
//                                 <div className="border-t pt-2 flex justify-between font-medium">
//                                   <span>Total</span>
//                                   <span>
//                                     ${(metroRoutes.find(route => route.id === selectedRoute)?.price || 0 * (ticketType === "return" ? 1.8 : 1)).toFixed(2)}
//                                   </span>
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="mt-6">
//                         <Button 
//                           type="submit" 
//                           className="w-full bg-eco-blue-600 hover:bg-eco-blue-700"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? "Processing..." : "Purchase Ticket"}
//                           <CreditCard className="ml-2 h-4 w-4" />
//                         </Button>
//                       </div>
//                     </form>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </div>
          
//           {/* Benefits & Info */}
//           <div>
//             <Card className="mb-6">
//               <CardHeader>
//                 <CardTitle>Benefits</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   <li className="flex">
//                     <div className="mr-3 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-eco-green-100 text-eco-green-600">✓</div>
//                     <span>Earn 1 point per $1 spent on tickets</span>
//                   </li>
//                   <li className="flex">
//                     <div className="mr-3 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-eco-green-100 text-eco-green-600">✓</div>
//                     <span>Save approximately 0.21kg CO₂ per km compared to driving</span>
//                   </li>
//                   <li className="flex">
//                     <div className="mr-3 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-eco-green-100 text-eco-green-600">✓</div>
//                     <span>Mobile tickets for contactless travel</span>
//                   </li>
//                   <li className="flex">
//                     <div className="mr-3 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-eco-green-100 text-eco-green-600">✓</div>
//                     <span>Return tickets include 10% discount</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Need Help?</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600">
//                   For assistance with booking or ticket issues, contact our customer service team.
//                 </p>
//                 <Button variant="outline" className="w-full mt-4">
//                   Contact Support
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
      
//       {/* Success Dialog */}
//       <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Ticket Purchased Successfully!</DialogTitle>
//             <DialogDescription>
//               Your ticket has been booked and added to your account.
//             </DialogDescription>
//           </DialogHeader>
          
//           {ticket && (
//             <div className="space-y-6">
//               <div className="bg-gray-50 p-4 rounded-lg space-y-4">
//                 <div className="text-center mb-2">
//                   <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-eco-green-100 text-eco-green-600 mb-3">
//                     <QrCode className="h-6 w-6" />
//                   </div>
//                   <h3 className="text-lg font-medium">E-Ticket</h3>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div>
//                     <span className="text-gray-500 block">From</span>
//                     <span className="font-medium">{ticket.from}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">To</span>
//                     <span className="font-medium">{ticket.to}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">Date</span>
//                     <span className="font-medium">{ticket.date}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">Time</span>
//                     <span className="font-medium">{ticket.departureTime}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">Type</span>
//                     <span className="font-medium capitalize">{ticket.type}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">Price</span>
//                     <span className="font-medium">${ticket.price.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <div className="border-t pt-3 mt-3">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Points Earned</span>
//                     <span className="font-semibold text-eco-green-600">+{ticket.points} points</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">CO₂ Saved</span>
//                     <span className="font-semibold text-eco-green-600">{ticket.co2Saved} kg</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="border rounded-lg p-3 text-center">
//                 <p className="text-sm text-gray-600 mb-2">Scan this QR code at the station</p>
//                 <img 
//                   src={ticket.qrCode} 
//                   alt="Ticket QR Code"
//                   className="w-32 h-32 mx-auto" 
//                 />
//               </div>
//             </div>
//           )}
          
//           <DialogFooter className="sm:justify-center">
//             <Button 
//               className="bg-eco-green-600 hover:bg-eco-green-700" 
//               onClick={() => setShowSuccess(false)}
//             >
//               Done
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
