/*import { useEffect, useState } from "react";

export default function TestAPI() {
  const [data, setData] = useState(null);

  useEffect(() => {
    //fetch(process.env.NEXT_PUBLIC_API_URL + "/api/home/")
    fetch("http://backend:8000/api/home/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  return (
    <div>
      <h1>Test API Django</h1>
      {data ? <p>Réponse : {JSON.stringify(data)}</p> : <p>Chargement...</p>}
    </div>
  );
}


//*/

// Dans un fichier Next.js (par exemple, dans un composant ou une page)
