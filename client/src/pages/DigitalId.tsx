import { Share2, Download, ShieldCheck, MapPin, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function DigitalId() {
  return (
    <div className="pb-24 pt-8 container max-w-lg mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-accent">Digital ID Card</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative w-full aspect-[1/1.58] md:aspect-[1.58/1] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-white border border-gray-100"
      >
        {/* Hologram Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none hologram-effect opacity-30 mix-blend-overlay"></div>
        
        {/* Card Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-green-50 z-0">
           <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-accent to-blue-800 rounded-b-[50%] scale-x-150 opacity-90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-10">
          
          {/* Header Section (Mobile Top) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left text-white md:w-1/3 shrink-0">
             <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-10 h-10 opacity-80" />
             </div>
             <h2 className="text-lg font-bold uppercase tracking-widest opacity-90">Shramik-Setu</h2>
             <p className="text-xs uppercase tracking-wide opacity-75">Govt. Verified Worker</p>
          </div>

          {/* Photo & Main Info */}
          <div className="flex-1 flex flex-col items-center md:items-start md:pt-16">
            <div className="relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-200">
                {/* Descriptive placeholder for user photo */}
                {/* indian construction worker portrait smiling */}
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60" 
                  alt="Ramesh Kumar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-1.5 rounded-full border-2 border-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">Ramesh Kumar</h3>
            <p className="text-primary font-medium mb-4 flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full text-sm">
              <Star className="w-3 h-3 fill-primary" />
              Master Mason (Level 3)
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Worker ID</p>
                <p className="font-mono font-bold text-gray-800 tracking-wide">SHW-2024-8921</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Date of Birth</p>
                <p className="font-medium text-gray-800">12 Aug 1988</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Skills</p>
                <p className="font-medium text-gray-800">Masonry, Plastering, Tiles</p>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Sector 62, Noida, UP</span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-end md:w-1/4 shrink-0 mt-auto">
             <div className="bg-white p-2 rounded-xl shadow-inner border border-gray-100 mb-2">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SHramikSetu-SHW-2024-8921`} alt="QR Code" className="w-20 h-20 mix-blend-multiply opacity-80" />
             </div>
             <p className="text-[10px] text-gray-400 text-center font-mono uppercase">Scan to Verify</p>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      </motion.div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          This digital ID is recognized by the Ministry of Labour & Employment.
          <br/>Present this QR code at construction sites for instant gate entry.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
          <ShieldCheck className="w-4 h-4" />
          Background Verified: Clean Record
        </div>
      </div>
    </div>
  );
}
