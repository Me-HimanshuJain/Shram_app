import { useJobs, useCreateJob } from "@/hooks/use-shramik";
import { GradientCard } from "@/components/GradientCard";
import { Briefcase, MapPin, Clock, IndianRupee, Filter, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { InsertJob } from "@shared/schema";
import { motion } from "framer-motion";

export default function Jobs() {
  const { data: jobs, isLoading } = useJobs();
  const [filter, setFilter] = useState("all");

  return (
    <div className="pb-24 pt-8 container max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-accent">Available Jobs</h1>
          <p className="text-gray-500 mt-1">Found {jobs?.length || 0} opportunities near you</p>
        </div>
        <CreateJobDialog />
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {['all', 'construction', 'plumbing', 'electrical', 'painting'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === type 
                ? 'bg-accent text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-accent'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {jobs?.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function JobCard({ job }: { job: any }) {
  return (
    <GradientCard className="flex flex-col md:flex-row gap-4 md:items-center justify-between group">
      <div className="flex-1">
        <div className="flex items-start justify-between md:hidden mb-2">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
            {job.status}
          </span>
          <span className="text-xs text-gray-400">2h ago</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {job.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            {job.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            Full Time
          </div>
          <div className="flex items-center gap-1.5 font-bold text-gray-900">
            <IndianRupee className="w-4 h-4 text-green-600" />
            {job.wage}/day
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0 border-t pt-4 md:border-t-0 md:pt-0">
        <span className="hidden md:inline-block text-xs text-gray-400 mb-2">Posted 2h ago</span>
        <button className="w-full md:w-auto px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/10">
          Apply Now
        </button>
      </div>
    </GradientCard>
  );
}

function CreateJobDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createJob = useCreateJob();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: InsertJob = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      wage: Number(formData.get("wage")),
      employerId: 1, // hardcoded for demo
      status: "open"
    };

    createJob.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        toast({ title: "Job Posted!", description: "Workers will be notified immediately." });
      },
      onError: () => {
        toast({ title: "Error", description: "Could not post job. Try again.", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full h-12 w-12 p-0 md:w-auto md:px-6 md:h-12 bg-primary hover:bg-orange-600 shadow-lg shadow-orange-500/30">
          <Plus className="w-6 h-6 md:mr-2" />
          <span className="hidden md:inline">Post Job</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill in the details to find skilled workers near you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <Input name="title" placeholder="e.g. Need Mason for Wall Repair" required className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea name="description" placeholder="Describe the work required..." required className="rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input name="location" placeholder="City, Area" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Wage (₹)</label>
              <Input name="wage" type="number" placeholder="800" required className="rounded-xl" />
            </div>
          </div>
          <Button type="submit" disabled={createJob.isPending} className="w-full rounded-xl h-12 text-lg font-semibold bg-accent hover:bg-blue-900">
            {createJob.isPending ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
