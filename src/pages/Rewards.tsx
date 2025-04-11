
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Award, Coffee, ShoppingBag, Ticket, Gift, Check, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Example rewards data
const rewardsData = [
  {
    id: 1,
    title: "Coffee Shop Voucher",
    description: "Get a free coffee at participating coffee shops",
    icon: Coffee,
    points: 100,
    category: "food",
    available: true,
  },
  {
    id: 2,
    title: "Movie Ticket",
    description: "One free movie ticket at Cineplex",
    icon: Ticket,
    points: 250,
    category: "entertainment",
    available: true,
  },
  {
    id: 3,
    title: "Eco-friendly Tote Bag",
    description: "Stylish and sustainable shopping bag",
    icon: ShoppingBag,
    points: 150,
    category: "merchandise",
    available: true,
  },
  {
    id: 4,
    title: "$10 Gift Card",
    description: "Gift card for your favorite retail store",
    icon: Gift,
    points: 300,
    category: "gift cards",
    available: true,
  },
  {
    id: 5,
    title: "Public Transport Day Pass",
    description: "Free one-day pass for all public transport",
    icon: CreditCard,
    points: 200,
    category: "transport",
    available: true,
  },
];

export default function Rewards() {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(248);
  const [selectedReward, setSelectedReward] = useState<null | typeof rewardsData[0]>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);
  
  const handleRedeemReward = (reward: typeof rewardsData[0]) => {
    if (userPoints < reward.points) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.points - userPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedReward(reward);
    setShowConfirmation(true);
  };
  
  const confirmRedemption = () => {
    if (selectedReward) {
      // Deduct points and mark reward as redeemed
      setUserPoints(userPoints - selectedReward.points);
      setRedeemedRewards([...redeemedRewards, selectedReward.id]);
      
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${selectedReward.title}`,
      });
      
      setShowConfirmation(false);
    }
  };
  
  const cancelRedemption = () => {
    setSelectedReward(null);
    setShowConfirmation(false);
  };
  
  // Filter rewards by category
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredRewards = activeCategory === "all" 
    ? rewardsData 
    : rewardsData.filter(reward => reward.category === activeCategory);
  
  // Categories
  const categories = [
    { id: "all", label: "All Rewards" },
    { id: "food", label: "Food & Drinks" },
    { id: "entertainment", label: "Entertainment" },
    { id: "merchandise", label: "Merchandise" },
    { id: "gift cards", label: "Gift Cards" },
    { id: "transport", label: "Transport" },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rewards</h1>
          <p className="mt-3 text-xl text-gray-600 max-w-3xl mx-auto">
            Redeem your hard-earned points for eco-friendly rewards
          </p>
        </div>
        
        {/* User Points Section */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-12 w-12 rounded-full bg-eco-amber-100 flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-eco-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">{userPoints} Points</h3>
                  <p className="text-gray-500">Keep commuting to earn more!</p>
                </div>
              </div>
              <div className="flex-1 md:max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to next tier</span>
                  <span className="font-medium">Silver Member</span>
                </div>
                <Progress value={userPoints / 5} className="h-2" />
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>0</span>
                  <span>500</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Categories Filter */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 p-1 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-eco-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rewards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => {
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canAfford = userPoints >= reward.points;
            
            return (
              <Card key={reward.id} className={`overflow-hidden ${isRedeemed ? 'opacity-70' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="rounded-full p-2 bg-gray-100">
                      <reward.icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <div className="bg-eco-amber-100 text-eco-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                      {reward.points} pts
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <CardTitle className="text-xl mb-2">{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  {isRedeemed ? (
                    <Button className="w-full bg-gray-300 text-gray-700 cursor-default" disabled>
                      <Check className="h-4 w-4 mr-2" />
                      Redeemed
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${canAfford ? 'bg-eco-green-600 hover:bg-eco-green-700' : 'bg-gray-300'}`}
                      disabled={!canAfford}
                      onClick={() => handleRedeemReward(reward)}
                    >
                      {canAfford ? 'Redeem Reward' : `Need ${reward.points - userPoints} more points`}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
          
          {filteredRewards.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No rewards available in this category yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this reward? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="flex items-center p-4 border rounded-lg my-4">
              <div className="rounded-full p-3 bg-gray-100 mr-4">
                <selectedReward.icon className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h4 className="font-medium">{selectedReward.title}</h4>
                <p className="text-sm text-gray-500">{selectedReward.points} points</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={cancelRedemption}>
              Cancel
            </Button>
            <Button onClick={confirmRedemption} className="bg-eco-green-600 hover:bg-eco-green-700">
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
