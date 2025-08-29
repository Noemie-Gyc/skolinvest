import { LoginInput } from "@/components/loginInput";
import { ConnexionButton } from "@/components/connexionButton";

type AdminLoginFormProps = {
  title: string;
  username: string;
  password: string;
  loading?: boolean;
  errorMsg?: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function AdminLoginForm({
  title,
  username,
  password,
  loading = false,
  errorMsg,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: AdminLoginFormProps) {
  return (
    <form
      className="
        bg-white rounded-[20px] shadow
        flex flex-col items-center gap-4
        max-w-xl mx-auto
        w-[50vw] min-w-[200px]
        px-4 py-8
        sm:px-8 sm:py-12
        md:px-16 md:py-16
      "
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "white",
        padding: "4rem",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        minWidth: "300px",
        alignItems: "center",
      }}
    >
      <h1
        className="
          text-xl font-bold text-blue-700 text-center mb-8
          sm:text-2xl sm:mb-12
          md:text-3xl
        "
        style={{ marginBottom: "3rem" }}
      >
        {title}
      </h1>
      <LoginInput
        id="username"
        label="identifiant"
        placeholder="Identifiant"
        value={username}
        hideLabel={true}
        onChange={onUsernameChange}
        required
      />
      <LoginInput
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Mot de passe"
        value={password}
        hideLabel={true}
        onChange={onPasswordChange}
        required
      />
      <ConnexionButton
        type="submit"
        disabled={loading}
        style={{ marginBottom: "1rem", marginTop: "2rem" }}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </ConnexionButton>
      {errorMsg && (
        <p id="login-error" role="alert" className="text-red-700 font-bold">
          {errorMsg}
        </p>
      )}
    </form>
  );
}