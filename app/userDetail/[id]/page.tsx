// app/userDetail/[id]/page.tsx
"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Utiliser next/navigation pour le nouveau système de routing

export default function UserDetail({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ username: '', email: '' });
  const router = useRouter();
 console.log(formData);
 
  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/edit/${params.id}`);
          const data = await response.json();
          setFormData(data);
           console.log('user', data);
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, [status, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/edit/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.refresh(); // Utiliser router.refresh() pour recharger la page après la mise à jour
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Mon Profil</h1>
      {session ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
      ) : (
        <p>Vous devez être connecté pour voir cette page.</p>
      )}
    </div>
  );
}
