/*export default function Home() {
    return (
      <div>
        <h1>Bienvenue sur mon projet Next.js ! 🎉</h1>
        <p>Lalala Accédez au test de l'API Django ici : <a href="/api/test">/api/test</a></p>
      </div>
    );
  }
  
  */

  import { useEffect, useState } from 'react';

const MyComponent = () => {
    const [message, setMessage] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/home/')  // Assurez-vous que l'URL pointe vers l'API Django
      .then(response => response.json())  // Convertir la réponse en JSON
      .then(data => {
        setMessage(data.message);  // Stocker le message dans le state
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

    return (
      <div>
      <h1>{message || 'Chargement...'}</h1>

  
      </div>
    );
};

export default MyComponent;

  