import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col justify-center items-center mt-4 mb-2 md:mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl">Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-3 md:gap-4">
          <Input
            label="Email"
            classNames={{
              inputWrapper:
                "bg-zinc-200 focus-within:border-2 focus-within:border-primary",
              input: "bg-transparent focus:outline-none text-sm md:text-base",
              label: "text-sm md:text-base",
            }}
            labelPlacement="outside"
            type="email"
            variant="flat"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            classNames={{
              inputWrapper:
                "bg-zinc-200 focus-within:border-2 focus-within:border-primary",
              input: "bg-transparent focus:outline-none text-sm md:text-base",
              label: "text-sm md:text-base",
            }}
            labelPlacement="outside"
            type="password"
            variant="flat"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 text-right md:mb-6">
          <Link
            href="/forgot-password"
            className="text-xs transition-all duration-300 md:text-sm text-zinc-400 hover:text-zinc-600"
          >
            Esqueci minha senha
          </Link>
        </div>

        <div className="overflow-hidden relative mb-16 rounded-full md:mb-24">
          <button
            type="submit"
            className="px-4 py-2.5 md:py-3 w-full text-white text-sm md:text-base font-medium rounded-full bg-gradient-to-r from-[#61D9DE] to-[#1200AF] transition-all hover:opacity-90 hover:shadow-x"
          >
            Login
            {showAnimation && (
              <motion.div
                key="button-animation"
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 7,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            )}
          </button>
        </div>
      </form>
      <div className="text-xs text-center text-gray-400 md:text-sm">
        made by Ctrl Alt Del
      </div>
    </div>
  );
}
