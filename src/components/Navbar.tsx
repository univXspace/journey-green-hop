
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Award, TrendingUp, LogIn, MapPin, Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Log Trip", href: "/log-trip", icon: MapPin },
  { name: "Rewards", href: "/rewards", icon: Award },
  { name: "Dashboard", href: "/dashboard", icon: TrendingUp },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-eco-green-600 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-500 text-transparent bg-clip-text">
                EcoHop
              </span>
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center text-sm font-medium py-2 ${
                    isActive(item.href)
                      ? "text-eco-green-600 border-b-2 border-eco-green-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex">
            <Button asChild variant="default" className="bg-eco-green-600 hover:bg-eco-green-700">
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[385px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-eco-green-600 flex items-center justify-center mr-3">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-eco-green-600 to-eco-blue-500 text-transparent bg-clip-text">
                        EcoHop
                      </span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <nav className="flex-1 pt-6 pb-4 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                          isActive(item.href)
                            ? "text-eco-green-600 bg-eco-green-50"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="border-t pt-4">
                    <Button asChild className="w-full bg-eco-green-600 hover:bg-eco-green-700">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
