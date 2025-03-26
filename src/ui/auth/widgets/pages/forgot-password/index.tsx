import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState } from "react";
import { useAuthContext } from "@/ui/auth/contexts/auth-context/hooks/use-auth-context";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { forgotPassword } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await forgotPassword(email);

      if (result) {
        setSuccess(true);
      } else {
        setError(
          "Não foi possível processar sua solicitação. Verifique o email e tente novamente."
        );
      }
    } catch (err) {
      setError(
        "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col justify-center items-center mt-4 mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold text-center md:text-3xl">
          Recuperar Senha
        </h1>
      </div>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {success ? (
        <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-md">
          <p>Enviamos um email com instruções para redefinir sua senha.</p>
          <p className="mt-2">
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Voltar para o login
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <p className="mb-4 text-sm text-gray-600">
              Digite seu email e enviaremos instruções para redefinir sua senha.
            </p>
            <Input
              label="Email"
              classNames={{
                inputWrapper:
                  "bg-zinc-200 focus-within:border-2 focus-within:border-primary",
                input: "bg-transparent focus:outline-none text-sm md:text-base",
                label: "text-sm md:text-base",
              }}
              labelPlacement="outside-left"
              type="email"
              variant="flat"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="px-4 py-2.5 md:py-3 w-full text-white text-sm md:text-base font-medium rounded-full bg-gradient-to-r from-[#61D9DE] to-[#1200AF] transition-all hover:opacity-90 hover:shadow-x"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar instruções"}
            </button>

            <Link
              href="/login"
              className="text-sm text-center text-zinc-500 hover:text-zinc-700"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
