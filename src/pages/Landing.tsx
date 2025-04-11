
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { 
  Bus, Bike, Leaf, Award, TrendingUp, MapPin, CheckCircle, ChevronRight
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Earn rewards for your
                <span className="bg-gradient-to-r from-eco-green-600 to-eco-blue-500 text-transparent bg-clip-text"> eco-friendly commutes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Track your bus and metro rides, earn points, and get rewarded for reducing your carbon footprint.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-eco-green-600 hover:bg-eco-green-700">
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="mt-10 flex items-center text-sm text-gray-500">
                <Leaf className="h-5 w-5 text-eco-green-500 mr-2" />
                <span>Join over 5,000 eco-conscious commuters</span>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-eco-green-100 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-eco-blue-100 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1565715101841-25f45b2fa14f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Person using public transport"
                  className="w-full h-auto rounded-xl"
                />
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="h-10 w-10 rounded-full bg-eco-green-100 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-eco-green-600" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-eco-blue-100 flex items-center justify-center">
                        <Bus className="h-6 w-6 text-eco-blue-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Reduce CO₂</p>
                      <p className="text-xs text-green-600 font-medium">-350kg this year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How EcoHop Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to earn rewards for choosing eco-friendly transportation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="eco-card">
              <div className="rounded-full bg-eco-green-100 w-12 h-12 flex items-center justify-center mb-5">
                <MapPin className="h-6 w-6 text-eco-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Log Your Trips</h3>
              <p className="text-gray-600 mb-4">
                Simply log your bus or metro rides with just a few taps. Enter your start and end locations.
              </p>
              <ul className="space-y-2">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-eco-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Track bus & metro trips</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-eco-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Save favorite routes</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="eco-card">
              <div className="rounded-full bg-eco-blue-100 w-12 h-12 flex items-center justify-center mb-5">
                <TrendingUp className="h-6 w-6 text-eco-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track Your Impact</h3>
              <p className="text-gray-600 mb-4">
                See your environmental impact with detailed statistics on CO₂ saved and distance traveled.
              </p>
              <ul className="space-y-2">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-eco-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Visual environmental stats</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-eco-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Weekly & monthly reports</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="eco-card">
              <div className="rounded-full bg-eco-amber-100 w-12 h-12 flex items-center justify-center mb-5">
                <Award className="h-6 w-6 text-eco-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Rewards</h3>
              <p className="text-gray-600 mb-4">
                Collect points for each trip and redeem them for exclusive rewards and discounts.
              </p>
              <ul className="space-y-2">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-eco-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Redeem for gift cards & discounts</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-eco-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Earn badges & complete challenges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-eco-green-600 to-eco-blue-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make your commute count?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join EcoHop today and start earning rewards for every eco-friendly trip you take.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-eco-green-600 hover:bg-gray-100">
            <Link to="/login">Sign Up Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Link to="/" className="inline-flex items-center">
                <span className="text-xl font-bold text-white">EcoHop</span>
              </Link>
              <p className="mt-3 text-gray-400 max-w-md">
                Promoting sustainable transportation through rewards and tracking.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                  <li><Link to="/rewards" className="text-gray-400 hover:text-white">Rewards</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 EcoHop. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
