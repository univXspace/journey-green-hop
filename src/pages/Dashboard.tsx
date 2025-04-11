
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Award, Bus, Train, TrendingUp, Clock, Activity, Calendar } from "lucide-react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// Dummy data for charts
const weeklyData = [
  { day: "Mon", trips: 2, distance: 12.5, co2Saved: 2.6 },
  { day: "Tue", trips: 1, distance: 8.2, co2Saved: 1.7 },
  { day: "Wed", trips: 3, distance: 15.7, co2Saved: 3.3 },
  { day: "Thu", trips: 2, distance: 10.1, co2Saved: 2.1 },
  { day: "Fri", trips: 2, distance: 9.8, co2Saved: 2.1 },
  { day: "Sat", trips: 0, distance: 0, co2Saved: 0 },
  { day: "Sun", trips: 1, distance: 5.3, co2Saved: 1.1 },
];

const transportData = [
  { name: "Bus", value: 65 },
  { name: "Metro", value: 35 },
];

const COLORS = ["#2E7D32", "#1976D2"]; // Green for bus, Blue for metro

// Calculate totals from weekly data
const totalTrips = weeklyData.reduce((sum, day) => sum + day.trips, 0);
const totalDistance = weeklyData.reduce((sum, day) => sum + day.distance, 0);
const totalCO2Saved = weeklyData.reduce((sum, day) => sum + day.co2Saved, 0);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Track your eco-impact and commuting stats
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Points */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">248</h3>
                    <span className="ml-2 text-xs text-green-600 font-medium">+24 this week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-eco-amber-100 flex items-center justify-center">
                  <Award className="h-6 w-6 text-eco-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress to next reward</span>
                  <span>248/300</span>
                </div>
                <Progress value={82} className="h-2 bg-gray-100" />
              </div>
            </CardContent>
          </Card>
          
          {/* CO2 Saved */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">CO₂ Saved</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{totalCO2Saved.toFixed(1)} kg</h3>
                    <span className="ml-2 text-xs text-green-600 font-medium">This week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-eco-green-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-eco-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span>12% increase from last week</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Trips */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Trips</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{totalTrips}</h3>
                    <span className="ml-2 text-xs text-gray-500 font-medium">This week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-eco-blue-100 flex items-center justify-center">
                  <Bus className="h-6 w-6 text-eco-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground flex justify-between">
                  <div className="flex items-center">
                    <Bus className="h-3 w-3 mr-1 text-eco-green-600" />
                    <span>Bus: {transportData[0].value}%</span>
                  </div>
                  <div className="flex items-center">
                    <Train className="h-3 w-3 mr-1 text-eco-blue-600" />
                    <span>Metro: {transportData[1].value}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Streak */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">5 days</h3>
                    <span className="ml-2 text-xs text-orange-600 font-medium">Best: 12 days</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex space-x-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div 
                      key={day} 
                      className={`h-1 flex-1 rounded-full ${
                        i < 5 ? 'bg-orange-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Weekly Activity Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Your eco-friendly commuting activity for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="distance">
                <TabsList className="mb-4">
                  <TabsTrigger value="distance">Distance</TabsTrigger>
                  <TabsTrigger value="trips">Trips</TabsTrigger>
                  <TabsTrigger value="co2">CO₂ Saved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="distance">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} km`, 'Distance']}
                          contentStyle={{ borderRadius: '8px' }}
                        />
                        <Bar dataKey="distance" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="trips">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value}`, 'Trips']}
                          contentStyle={{ borderRadius: '8px' }}
                        />
                        <Bar dataKey="trips" fill="#1976D2" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="co2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} kg`, 'CO₂ Saved']}
                          contentStyle={{ borderRadius: '8px' }}
                        />
                        <Bar dataKey="co2Saved" fill="#43A047" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Transport Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Transport Distribution
              </CardTitle>
              <CardDescription>
                Your most used transport types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={transportData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {transportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Usage']}
                      contentStyle={{ borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-eco-green-600 rounded-full mr-2"></div>
                    <span className="text-sm">Bus</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-eco-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm">Metro</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges and Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Badges and Achievements
            </CardTitle>
            <CardDescription>
              Rewards earned through your eco-friendly commuting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-eco-green-100 flex items-center justify-center mb-3 relative">
                  <Leaf className="h-10 w-10 text-eco-green-600" />
                  <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-eco-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Eco Starter</h4>
                <p className="text-xs text-gray-500">First trip logged</p>
              </div>
              
              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-eco-blue-100 flex items-center justify-center mb-3 relative">
                  <Bus className="h-10 w-10 text-eco-blue-600" />
                  <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-eco-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Bus Enthusiast</h4>
                <p className="text-xs text-gray-500">10 bus trips</p>
              </div>
              
              {/* Badge 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-eco-blue-100 flex items-center justify-center mb-3 relative opacity-40">
                  <Train className="h-10 w-10 text-eco-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Metro Master</h4>
                <p className="text-xs text-gray-500">25 metro trips</p>
                <span className="text-xs text-orange-600 mt-1">15 more to unlock</span>
              </div>
              
              {/* Badge 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center mb-3 relative">
                  <Activity className="h-10 w-10 text-orange-600" />
                  <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-eco-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Consistent Hopper</h4>
                <p className="text-xs text-gray-500">5-day streak</p>
              </div>
              
              {/* Badge 5 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-eco-green-100 flex items-center justify-center mb-3 relative opacity-40">
                  <Clock className="h-10 w-10 text-eco-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Weekly Warrior</h4>
                <p className="text-xs text-gray-500">Trip every day for a week</p>
                <span className="text-xs text-orange-600 mt-1">2 more days to unlock</span>
              </div>
              
              {/* Badge 6 */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center mb-3 relative opacity-40">
                  <Award className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Carbon Champion</h4>
                <p className="text-xs text-gray-500">Save 50kg of CO₂</p>
                <span className="text-xs text-orange-600 mt-1">37.1kg more to unlock</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
