import { Award, Star, TrendingUp, Gift, Users } from "lucide-react";
import { GradientCard } from "@/components/GradientCard";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function Rewards() {
  return (
    <div className="pb-24 pt-8 container max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Star Worker Program</span>
        <h1 className="text-3xl font-bold text-accent">Your Rewards & Badges</h1>
      </div>

      {/* Progress Card */}
      <GradientCard variant="orange" className="mb-8 overflow-hidden relative border-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg border-4 border-orange-200">
            <Award className="w-12 h-12 text-orange-500" />
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-xl font-bold text-gray-900">Level 3: Master Artisan</h2>
              <span className="text-sm font-bold text-orange-700">780/1000 XP</span>
            </div>
            <Progress value={78} className="h-4 bg-white/50" indicatorClassName="bg-gradient-to-r from-orange-500 to-red-500" />
            <p className="text-sm text-gray-600 mt-2">
              You are 220 XP away from unlocking <span className="font-bold text-primary">Gold Tier Benefits</span> (Free Insurance)
            </p>
          </div>
        </div>
      </GradientCard>

      {/* Badges Grid */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Earned Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <BadgeCard title="Early Bird" icon={Star} color="text-yellow-500" bg="bg-yellow-50" unlocked={true} />
        <BadgeCard title="Quality Master" icon={Award} color="text-purple-500" bg="bg-purple-50" unlocked={true} />
        <BadgeCard title="Team Player" icon={Users} color="text-blue-500" bg="bg-blue-50" unlocked={true} />
        <BadgeCard title="Streak: 30 Days" icon={TrendingUp} color="text-green-500" bg="bg-green-50" unlocked={false} />
      </div>

      {/* Referral */}
      <GradientCard variant="blue" className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-blue-900">Refer a Friend</h3>
          <p className="text-sm text-blue-700">Earn ₹500 for every verified worker you bring.</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <Gift className="w-6 h-6 text-blue-600" />
        </div>
      </GradientCard>
    </div>
  );
}

function BadgeCard({ title, icon: Icon, color, bg, unlocked }: any) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col items-center text-center gap-3 transition-all ${unlocked ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'}`}>
      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <span className="text-sm font-medium text-gray-800">{title}</span>
    </div>
  );
}
