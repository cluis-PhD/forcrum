'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert(`Login como: ${username}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary rounded-2xl mb-4">
            <GraduationCap size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
          <p className="text-gray-600">Entre na plataforma forScrum</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do utilizador
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              placeholder="formador ou formando"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'A entrar...' : 'Entrar na Plataforma'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          forScrum © 2025 - Aplicação de Ensino Scrum
        </p>
      </div>
    </div>
  );
}
