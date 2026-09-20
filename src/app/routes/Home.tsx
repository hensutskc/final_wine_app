import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.tsx';
import { Button } from '../components/ui/button';
import { Wine, Package, Sparkles, LogOut, ArrowRight, Home as HomeIcon, User } from 'lucide-react';
import logo from "../../logo.png";
import winegrapes from "../../winegrapes.png";

export function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  const features = [
    {
      icon: Wine,
      title: 'The Cellar',
      description: 'Curate and manage your personal wine collection with detailed tasting notes and ratings',
      path: '/cellar',
    },
    {
      icon: Package,
      title: 'Track My Orders',
      description: 'Monitor your wine orders and deliveries in real-time',
      path: '/orders',
    },
    {
      icon: Sparkles,
      title: 'MyWine AI',
      description: 'Discover new wines tailored to your preferences with AI-powered recommendations',
      path: '/ai',
    },
  ];

  return ( //making changes
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r-4 border-[#D4AF37]/20 flex flex-col"> {/* This is the border line */}
        {/* Logo */}
        <div className="p-6 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            width={300} />
          </div>
        </div>


        {/* User Info */}
        <div className="p-6 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <User className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Welcome, {''}
                <span className="text-[#f5e178] font-bold capitalize">{user?.split("@")[0]} </span>
              </p>  
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </button>

            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.path}
                  onClick={() => navigate(feature.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span>{feature.title}</span>
                </button>
              );
            })}
          </div>

        {/* Logout */}
        <div className="p-4 border-t border-[#D4AF37]/20">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{/* Header */}
      <header className=" border-[#D4AF37]/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="rounded-2xl shadow-md p-5 overflow-hidden whitespace-nowrap flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${winegrapes})`, }}>
            <p className="inline-block text-white font-bold animate-bounce"> -- Explore Our New Catalogue! -- </p> </div>
        </div>
      </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent"></div>
          <div className="px-6 py-8 relative">
            <div className="max-w-3xl">
              <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
                Your Personal Wine Journey
              </h1>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 pb-24">
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.path}
                  className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => navigate(feature.path)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-8 flex items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-10 h-10 text-[#D4AF37]" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl mb-2 text-white group-hover:text-[#D4AF37] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-black group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Number badge */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-[#D4AF37]/10 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer accent */}
        <div className="border-t border-[#D4AF37]/20 bg-gradient-to-t from-[#D4AF37]/5 to-transparent">
          <div className="px-6 py-12">
            <div className="text-center">
              <p className="text-sm text-gray-500 tracking-wide">
                CRAFTED FOR WINE ENTHUSIASTS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

