"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Twitter, Wallet, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import clsx from "clsx";

export default function WaitlistForm() {
  const { data: session, status: sessionStatus } = useSession();
  const { publicKey } = useWallet();
  const [step, setStep] = useState<"auth" | "wallet" | "success">("auth");
  const [loading, setLoading] = useState(false);

  // Auto-advance if authenticated
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      setStep("wallet");
    }
  }, [sessionStatus]);

  // Auto-submit if wallet connected
  useEffect(() => {
    if (step === "wallet" && publicKey && session?.user) {
      handleJoin();
    }
  }, [publicKey, step, session]);

  const handleJoin = async () => {
    if (!session || !publicKey) return;
    setLoading(true);

    try {
      // Mock API call
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xHandle: session.user.name, // Or username if available in profile
          xId: session.user.email, // Using email as proxy ID for now
          wallet: publicKey.toString(),
        }),
      });
      
      if (res.ok) {
        setStep("success");
      }
    } catch (e) {
      console.error("Failed to join", e);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass rounded-2xl p-8 shadow-2xl shadow-brand/10 border-brand/20 relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand/20 rounded-full blur-3xl p-10" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand/10 rounded-full blur-3xl p-10" />

        <AnimatePresence mode="wait">
          {step === "auth" && (
            <motion.div
              key="auth"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                 <Twitter className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Connect X</h2>
              <p className="text-gray-400">Verify your social identity to verify you are human.</p>
              
              <button
                onClick={() => signIn("twitter")}
                disabled={sessionStatus === "loading"}
                className={clsx(
                  "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all",
                  "bg-white text-black hover:bg-gray-200 active:scale-95"
                )}
              >
                {sessionStatus === "loading" ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Connect With X <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </motion.div>
          )}

          {step === "wallet" && (
            <motion.div
              key="wallet"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand/20">
                <Wallet className="w-8 h-8 text-brand" />
              </div>
              <h2 className="text-2xl font-bold">Connect Wallet</h2>
              <p className="text-gray-400">Connect your Solana wallet to confirm your spot.</p>

              <div className="flex justify-center">
                 {/* CSS hack to override wallet button styles for our theme */}
                 <style jsx global>{`
                   .wallet-adapter-button {
                     background-color: var(--brand) !important;
                     color: black !important;
                     font-weight: bold !important;
                     border-radius: 0.75rem !important;
                     height: 3.5rem !important;
                     width: 100% !important;
                     justify-content: center !important;
                     font-family: inherit !important;
                   }
                   .wallet-adapter-button:hover {
                     background-color: #0ed01b !important;
                   }
                 `}</style>
                 <WalletMultiButton />
              </div>
              
              {loading && <p className="text-sm text-brand animate-pulse">Verifying...</p>}
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand/40 shadow-[0_0_30px_rgba(16,244,32,0.3)]">
                <CheckCircle className="w-10 h-10 text-brand" />
              </div>
              <h2 className="text-3xl font-bold text-white">You're In!</h2>
              <p className="text-gray-400">Welcome to the waitlist.</p>
              
              <div className="bg-white/5 rounded-lg p-4 mt-6 border border-white/10">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                <p className="font-mono text-brand">VERIFIED</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 text-center text-xs text-gray-500">
         <p>Secure connection via X & Solana</p>
      </div>
    </div>
  );
}
