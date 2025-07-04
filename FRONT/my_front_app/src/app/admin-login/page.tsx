"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginForm } from "@/components/adminLoginForm";

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
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        router.push("admin/modules");
        alert("Connexion réussie !");
        // Redirects to the main view of admin panel
      } else {
        if (data.detail) {
          setErrorMsg(data.detail);
        } else {
          setErrorMsg("Vous n'êtes pas autorisé à accéder à cet espace.");
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
        height: '90vh',        
      }}>
      
      <AdminLoginForm
        title="ESPACE ADMINISTRATEUR"
        username={username}
        password={password}
        loading={loading}
        errorMsg={errorMsg}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
      />
    </div>
  );
}
