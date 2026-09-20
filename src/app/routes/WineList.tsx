import { useWines } from '../hooks/useWines';
import { WineCard } from '../components/WineCard';
import { Button } from '../components/ui/button';
import { Plus, Wine as WineIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function WineList() {
  const navigate = useNavigate();
  const { wines, deleteWine, updateWine } = useWines();

  const handleRatingChange = (id: string, rating: number) => {
    const wine = wines.find(w => w.id === id);
    if (wine) {
      updateWine(id, { ...wine, rating });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/home')}
          className="mb-4 hover:bg-[#D4AF37]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <WineIcon className="w-10 h-10 text-[#D4AF37]" />
            <div>
              <h1 className="text-3xl">My Wine Cellar</h1>
              <p className="text-muted-foreground">
                {wines.length} {wines.length === 1 ? 'wine' : 'wines'} in collection
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/add')}
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Wine
          </Button>
        </div>

        {wines.length === 0 ? (
          <div className="text-center py-16">
            <WineIcon className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-50" />
            <h2 className="text-xl mb-2">Your cellar is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start building your collection by adding your first wine
            </p>
            <Button
              onClick={() => navigate('/add')}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Wine
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                onDelete={deleteWine}
                onRatingChange={handleRatingChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}