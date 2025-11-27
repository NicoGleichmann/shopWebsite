// frontend/components/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setError('Nicht authentifiziert');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Fehler beim Abrufen des Profils');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (loading) {
    return <div className="text-center mt-8">Lade Profil...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-8">Keine Benutzerdaten gefunden.</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Dein Profil</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="font-bold text-gray-600 dark:text-gray-300">Email:</label>
            <p className="text-gray-700 dark:text-gray-200">{user.email}</p>
          </div>
          <div>
            <label className="font-bold text-gray-600 dark:text-gray-300">Mitglied seit:</label>
            <p className="text-gray-700 dark:text-gray-200">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
