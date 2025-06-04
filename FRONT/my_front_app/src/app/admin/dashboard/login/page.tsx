"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/components/loginInput";
import { ConnexionButton } from "@/components/connexionButton"
import Cookies from "js-cookie";

export default function LoginPage() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard/modules");
        alert("Connexion réussie !");
        // Redirection si nécessaire
      } else {
        if (data.detail) {
          setErrorMsg(data.detail); // Par exemple : "No active account found"
        } else {
          setErrorMsg("Identifiants invalides ou non autorisé.");
        }
      }
    } catch (error) {
      console.error("Erreur réseau", error);
      setErrorMsg("Erreur réseau. Vérifie le backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>ESPACE ADMINISTRATEUR</h1>
       
      <form onSubmit={handleLogin}>
        <div>
        <LoginInput
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />

        <LoginInput
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        /><br /><br />

        <ConnexionButton type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </ConnexionButton>
       
        </div>
      </form>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  );
}
