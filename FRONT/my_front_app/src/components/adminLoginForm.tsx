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
        className="text-3xl font-bold text-blue-700 text-center"
        style={{ marginBottom: "3rem" }}
      >
        {title}
      </h1>
      <LoginInput
        placeholder="Identifiant"
        value={username}
        onChange={onUsernameChange}
        required
      />
      <LoginInput
        type="password"
        placeholder="Mot de passe"
        value={password}
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
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </form>
  );
}