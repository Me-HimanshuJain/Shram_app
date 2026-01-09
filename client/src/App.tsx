import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";

import Home from "@/pages/Home";
import DigitalId from "@/pages/DigitalId";
import Jobs from "@/pages/Jobs";
import Finance from "@/pages/Finance";
import Rewards from "@/pages/Rewards";
import AiAssistant from "@/pages/AiAssistant";
import FindWorkers from "@/pages/FindWorkers";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/digital-id" component={DigitalId} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/finance" component={Finance} />
        <Route path="/rewards" component={Rewards} />
        <Route path="/ai-assistant" component={AiAssistant} />
        <Route path="/find-workers" component={FindWorkers} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
