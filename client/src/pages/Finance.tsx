import { useState } from "react";
import { GradientCard } from "@/components/GradientCard";
import { IndianRupee, CheckCircle2, TrendingUp, AlertCircle, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateLoan } from "@/hooks/use-shramik";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { InsertLoan } from "@shared/schema";

export default function Finance() {
  return (
    <div className="pb-24 pt-8 container max-w-4xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6">Financial Wellness</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Commission Models */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-primary" />
            Choose Your Plan
          </h2>
          <div className="space-y-4">
            <ModelCard 
              title="Pay As You Earn" 
              price="5-8%"
              subtitle="per transaction"
              features={["No monthly commitment", "Pay only when you earn", "Basic insurance included"]}
              recommended={false}
              variant="orange"
            />
            <ModelCard 
              title="Shramik Pro" 
              price="₹2,499"
              subtitle="per month"
              features={["0% Commission on all jobs", "₹5L Accidental Insurance", "Priority Support", "Verified Gold Badge"]}
              recommended={true}
              variant="green"
            />
          </div>
        </section>

        {/* CRC Loans */}
        <section>
           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-600" />
            CRC Micro-Loans
          </h2>
          <GradientCard className="h-full border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Available Limit</p>
                <h3 className="text-3xl font-bold text-gray-900">₹25,000</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Instant credit for tools, medical emergencies, or skill upgrades. Repay in small daily installments.
            </p>

            <LoanCalculator />
          </GradientCard>
        </section>
      </div>
    </div>
  );
}

function ModelCard({ title, price, subtitle, features, recommended, variant }: any) {
  return (
    <div className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
      recommended 
        ? "border-green-500 bg-green-50/50" 
        : "border-gray-100 bg-white hover:border-orange-200"
    }`}>
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Most Popular
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-bold ${variant === 'green' ? 'text-green-700' : 'text-orange-600'}`}>{price}</span>
            <span className="text-sm text-gray-500">{subtitle}</span>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${recommended ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}>
          {recommended && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>
      <ul className="space-y-2">
        {features.map((feat: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoanCalculator() {
  const [amount, setAmount] = useState([5000]);
  const [duration, setDuration] = useState([3]);
  const createLoan = useCreateLoan();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const interest = Math.round(amount[0] * 0.015 * duration[0]); // 1.5% per month
  const total = amount[0] + interest;
  const emi = Math.round(total / duration[0]);

  const handleApply = () => {
    const loanData: InsertLoan = {
      workerId: 1, // hardcoded
      amount: amount[0],
      purpose: "Tool Purchase",
      status: "pending"
    };

    createLoan.mutate(loanData, {
      onSuccess: () => {
        setOpen(false);
        toast({ title: "Application Submitted", description: "Funds will be disbursed within 2 hours." });
      },
      onError: () => {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold h-12">
          Calculate & Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Loan Calculator</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Amount Needed</span>
              <span className="font-bold text-purple-700">₹{amount[0].toLocaleString()}</span>
            </div>
            <Slider 
              value={amount} 
              onValueChange={setAmount} 
              max={25000} 
              min={1000} 
              step={500} 
              className="py-2"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Repayment Period</span>
              <span className="font-bold text-purple-700">{duration[0]} Months</span>
            </div>
            <Slider 
              value={duration} 
              onValueChange={setDuration} 
              max={12} 
              min={1} 
              step={1} 
              className="py-2"
            />
          </div>

          <div className="bg-purple-50 p-4 rounded-xl space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Installment</span>
              <span className="font-bold text-gray-900">₹{emi}/mo</span>
            </div>
            <div className="flex justify-between border-t border-purple-100 pt-2 mt-2">
              <span className="text-gray-600">Total Repayment</span>
              <span className="font-bold text-purple-700">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Button 
            onClick={handleApply} 
            disabled={createLoan.isPending}
            className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-lg font-semibold"
          >
            {createLoan.isPending ? "Submitting..." : "Confirm & Apply"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
