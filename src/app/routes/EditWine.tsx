import { useParams, useNavigate } from 'react-router';
import { useWines } from '../hooks/useWines';
import { WineForm } from '../components/WineForm';
import { useEffect } from 'react';

export function EditWine() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wines, updateWine, getWineById } = useWines();

  const wine = id ? getWineById(id) : undefined;

  useEffect(() => {
    if (!wine && wines.length > 0) {
      navigate('/cellar');
    }
  }, [wine, wines, navigate]);

  if (!wine) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <WineForm
        wine={wine}
        onSubmit={(updatedWine) => updateWine(wine.id, updatedWine)}
        title="Edit Wine"
        description="Update wine details and rating"
      />
    </div>
  );
}