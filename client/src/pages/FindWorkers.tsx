import { useState } from "react";
import { Search, MapPin, Star, Filter, Phone, MessageCircle } from "lucide-react";
import { useUsers } from "@/hooks/use-shramik";
import { Input } from "@/components/ui/input";
import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FindWorkers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: workers, isLoading } = useUsers("worker");

  // Mock filtering for demo since API search param wasn't implemented fully
  const filteredWorkers = workers?.filter(w => 
    w.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pb-24 pt-8 container max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-accent mb-2">Find Verified Workers</h1>
        <p className="text-gray-500">Connect with skilled professionals in your area instantly.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10 relative">
        <div className="relative z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search by skill (e.g. Plumber) or name..." 
            className="pl-12 h-14 rounded-full shadow-lg border-gray-200 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {/* Decorative blur */}
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full transform scale-90 z-0"></div>
      </div>

      {/* Worker Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers?.map((worker, idx) => (
             <motion.div
               key={worker.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.1 }}
             >
               <WorkerCard worker={worker} />
             </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkerCard({ worker }: { worker: any }) {
  // Use consistent mock data for visual appeal since some DB fields might be null
  const skills = worker.skills || ["General Labour"];
  const rating = worker.rating || "4.5";
  const completedJobs = 45; // mock
  const rate = 850; // mock

  return (
    <GradientCard className="p-0 overflow-hidden group hover:border-primary/30 transition-all duration-300">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-md">
            {/* worker portrait */}
            <img 
              src={`https://api.dicebear.com/7.x/micah/svg?seed=${worker.username}`} 
              alt={worker.displayName}
              className="w-full h-full object-cover bg-orange-100"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
              {worker.displayName || worker.username}
            </h3>
            <div className="flex items-center gap-1 text-sm font-medium text-orange-500 mb-1">
              <Star className="w-4 h-4 fill-orange-500" />
              <span>{rating}</span>
              <span className="text-gray-400 font-normal">({completedJobs} Jobs)</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {worker.location || "Nearby"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill: string, i: number) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium border border-gray-200">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Daily Rate</span>
          <span className="text-lg font-bold text-gray-900">₹{rate}</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0 border-gray-300">
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </Button>
          <Button size="sm" className="rounded-full bg-accent hover:bg-blue-900">
            <Phone className="w-4 h-4 mr-2" />
            Hire
          </Button>
        </div>
      </div>
    </GradientCard>
  );
}
