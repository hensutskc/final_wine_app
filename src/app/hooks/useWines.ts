import { useState, useEffect } from 'react';

export interface Wine {
  id: string;
  name: string;
  type: string;
  year: string;
  region: string;
  rating: number;
  notes?: string;
}

const STORAGE_KEY = 'wine-cellar';

export function useWines() {
  const [wines, setWines] = useState<Wine[]>([]);

  // Load wines from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWines(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load wines:', error);
      }
    }
  }, []);

  // Save wines to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wines));
  }, [wines]);

  const addWine = (wine: Omit<Wine, 'id'>) => {
    const newWine: Wine = {
      ...wine,
      id: Date.now().toString(),
    };
    setWines([...wines, newWine]);
  };

  const updateWine = (id: string, updatedWine: Omit<Wine, 'id'>) => {
    setWines(wines.map(wine => 
      wine.id === id ? { ...updatedWine, id } : wine
    ));
  };

  const deleteWine = (id: string) => {
    setWines(wines.filter(wine => wine.id !== id));
  };

  const getWineById = (id: string) => {
    return wines.find(wine => wine.id === id);
  };

  return {
    wines,
    addWine,
    updateWine,
    deleteWine,
    getWineById,
  };
}
