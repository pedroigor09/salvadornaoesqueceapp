import { useState, useEffect } from 'react';
import { Victim } from '@/types';

interface VictimData {
  name: string;
  age: number;
  date: string;
  location: string;
  description: string;
  author: string;
  image?: string;
}

export function useVictims() {
  const [victims, setVictims] = useState<Victim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVictims = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/victims');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar vítimas');
      }
      
      const data = await response.json();
      setVictims(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const addVictim = async (victimData: VictimData): Promise<boolean> => {
    try {
      const response = await fetch('/api/victims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(victimData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao adicionar vítima');
      }

      const newVictim = await response.json();
      setVictims(prev => [newVictim, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    }
  };

  const updateVictim = async (id: string, data: Partial<Victim>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/victims/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar vítima');
      }

      const updatedVictim = await response.json();
      setVictims(prev => prev.map(v => v.id === id ? updatedVictim : v));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    }
  };

  const deleteVictim = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/victims/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao remover vítima');
      }

      setVictims(prev => prev.filter(v => v.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    }
  };

  useEffect(() => {
    fetchVictims();
  }, []);

  return {
    victims,
    loading,
    error,
    addVictim,
    updateVictim,
    deleteVictim,
    refetch: fetchVictims,
  };
}