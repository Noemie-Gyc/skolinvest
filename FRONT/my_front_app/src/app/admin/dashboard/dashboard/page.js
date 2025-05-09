"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("login"); // Rediriger si non connecté
      return;
    }

    // Appel à l'API Django pour récupérer les données admin
    fetch("http://localhost:8000/admin-data/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Accès refusé");
        }
        const data = await res.json();
        setAdminData(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Accès non autorisé.");
        router.push("login");
      });
  }, [router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!adminData) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Tableau de bord de l'administratrice</h1>
      <p>{adminData.message}</p>
      {/* Tu peux ajouter ici des statistiques, une liste d'utilisateurs, etc. */}
    </div>
  );
}