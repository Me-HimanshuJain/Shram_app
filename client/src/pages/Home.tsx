import { Link } from "wouter";
import { ShieldCheck, TrendingUp, Users, Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="pb-24 pt-4 md:pt-10">
      {/* Hero Section */}
      <section className="px-4 md:px-6 mb-12">
        <div className="bg-gradient-to-br from-accent via-blue-900 to-blue-800 rounded-[2rem] p-8 md:p-12 text-white shadow-xl shadow-blue-900/20 overflow-hidden relative">
          
          {/* Abstract Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-orange-300 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
                🇮🇳 Empowering India's Workforce
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                Your Digital Identity,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                  Guaranteed Earnings
                </span>
              </h1>
              <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                Shramik-Setu bridges the gap between skilled workers and opportunities. Get verified, get hired, and grow your wealth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/digital-id">
                  <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                    Worker Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/find-workers">
                  <button className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    I want to Hire
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-6 mb-16 container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Workers", value: "2.5L+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Jobs Completed", value: "85K+", icon: BriefcaseIcon, color: "text-green-600", bg: "bg-green-50" },
            { label: "Avg. Daily Earnings", value: "₹850", icon: Wallet, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Trust Score", value: "4.8/5", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-display">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6 mb-12 container mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">Why Choose Shramik-Setu?</h2>
            <p className="text-gray-500">Everything you need to succeed as a modern worker</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Digital Identity" 
            desc="Official verifiable digital ID card with QR code for instant trust."
            icon={IdCardIcon}
            href="/digital-id"
            color="orange"
          />
          <FeatureCard 
            title="Fair Earnings" 
            desc="Choose between 0% commission or fixed monthly models."
            icon={TrendingUp}
            href="/finance"
            color="green"
          />
          <FeatureCard 
            title="AI Sahayak" 
            desc="Voice-enabled assistant in 10+ Indian languages."
            icon={MessageSquareIcon}
            href="/ai-assistant"
            color="blue"
          />
          <FeatureCard 
            title="Micro Loans" 
            desc="Instant CRC-backed loans for tools and emergencies."
            icon={Wallet}
            href="/finance"
            color="purple"
          />
        </div>
      </section>
    </div>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IdCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 10h2" />
      <path d="M16 14h2" />
      <path d="M6.17 15a3 3 0 0 1 5.66 0" />
      <circle cx="9" cy="11" r="2" />
      <rect x="2" y="5" width="20" height="14" rx="2" />
    </svg>
  );
}

function MessageSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FeatureCard({ title, desc, icon: Icon, href, color }: any) {
  const colors = {
    orange: "text-orange-600 bg-orange-50 border-orange-100 group-hover:bg-orange-600 group-hover:text-white",
    green: "text-green-600 bg-green-50 border-green-100 group-hover:bg-green-600 group-hover:text-white",
    blue: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
    purple: "text-purple-600 bg-purple-50 border-purple-100 group-hover:bg-purple-600 group-hover:text-white",
  };

  return (
    <Link href={href}>
      <div className="group h-full p-6 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${colors[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
      </div>
    </Link>
  );
}
