'use client'

import { Input } from "@heroui/input";

import { useLoginPage } from "./use-login-page";
import { AnimatedButton } from "./animated-button";

export const LoginPage = () => {
  const { errors, isSubmitting, handleSubmit, registerField } = useLoginPage();

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col justify-center items-center mt-4 mb-2 md:mb-4">
        <h1 className="text-2xl font-semibold md:text-3xl">Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-6">
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
            disabled={isSubmitting}
            errorMessage={errors.email?.message}
            {...registerField("email")}
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
            disabled={isSubmitting}
            errorMessage={errors.password?.message}
            {...registerField("password")}
          />
        </div>
        <div className="overflow-hidden relative mb-10 rounded-full md:mb-12">
          <AnimatedButton isSubmitting={isSubmitting} showAnimation={false} />
        </div>
      </form>
      <div className="text-xs text-center text-gray-400 md:text-sm">
        made by Ctrl Alt Del
      </div>
    </div>
  );
};
