import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/ui/auth/contexts/auth-context/hooks/use-auth-context";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { resetPassword } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Token de redefinição inválido ou expirado.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!token) {
      setError("Token de redefinição inválido ou expirado.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await resetPassword(token, password);

      if (result) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(
          "Não foi possível redefinir sua senha. O token pode ser inválido ou ter expirado."
        );
      }
    } catch (err) {
      setError(
        "Ocorreu um erro ao redefinir sua senha. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col justify-center items-center mt-4 mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold md:text-3xl">Redefinir Senha</h1>
      </div>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {success ? (
        <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-md">
          <p>Sua senha foi redefinida com sucesso!</p>
          <p className="mt-2">Redirecionando para a página de login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input
              label="Nova Senha"
              classNames={{
                inputWrapper:
                  "bg-zinc-200 focus-within:border-2 focus-within:border-primary",
                input: "bg-transparent focus:outline-none text-sm md:text-base",
                label: "text-sm md:text-base",
              }}
              labelPlacement="outside"
              type="password"
              variant="flat"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || !token}
              required
            />

            <Input
              label="Confirmar Senha"
              classNames={{
                inputWrapper:
                  "bg-zinc-200 focus-within:border-2 focus-within:border-primary",
                input: "bg-transparent focus:outline-none text-sm md:text-base",
                label: "text-sm md:text-base",
              }}
              labelPlacement="outside"
              type="password"
              variant="flat"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || !token}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="px-4 py-2.5 md:py-3 w-full text-white text-sm md:text-base font-medium rounded-full bg-gradient-to-r from-[#61D9DE] to-[#1200AF] transition-all hover:opacity-90 hover:shadow-x"
              disabled={isLoading || !token}
            >
              {isLoading ? "Redefinindo..." : "Redefinir Senha"}
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
