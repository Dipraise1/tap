"use client";

import WaitlistForm from "@/components/WaitlistForm";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-brand/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="mb-8 relative w-32 h-32 mx-auto">
            <img 
              src="/logo.jpeg" 
              alt="Logo" 
              className="relative z-10 w-full h-full object-contain"
            />
          </div>

          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4 backdrop-blur-md">
            <span className="text-xs font-mono text-brand uppercase tracking-widest">Early Access</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            JOIN THE <br />
            <span className="text-brand text-brand-glow">REVOLUTION</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-lg text-gray-400 leading-relaxed">
            Secure your spot in the next generation of decentralized trading. 
            Connect your identity and wallet to qualify for the genesis drop.
          </p>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-full"
        >
          <WaitlistForm />
        </motion.div>
      </div>

      {/* Footer / Legal */}
      <footer className="absolute bottom-6 text-center text-xs text-gray-600 font-mono z-10">
        © 2026 PROJECT ALPHA. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
