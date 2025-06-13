"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/components/loginInput";
import { ConnexionButton } from "@/components/connexionButton"

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
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        router.push("dashboard");
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
    <div style={{
        display: 'flex',    
        flexDirection: 'column',      
        alignItems: 'center',      
        justifyContent: 'center',  
        height: '100vh',
        gap: '5rem',          
      }}>
      <h1 className="text-3xl font-bold text-blue-700 text-center">ESPACE ADMINISTRATEUR</h1>
       
      <form onSubmit={handleLogin}  style={{
          display: 'flex',
          flexDirection: 'column',     
          gap: '1rem',                 
          background: 'white',         
          padding: '2rem',             
          borderRadius: '8px',         
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
          minWidth: '300px',           
        }}>
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