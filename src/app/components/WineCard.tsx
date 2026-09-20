import { Wine } from '../hooks/useWines';
import { HeartRating } from './HeartRating';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Edit2, Trash2, Wine as WineIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

interface WineCardProps {
  wine: Wine;
  onDelete: (id: string) => void;
  onRatingChange: (id: string, rating: number) => void;
}

export function WineCard({ wine, onDelete, onRatingChange }: WineCardProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${wine.name} from your cellar?`)) {
      onDelete(wine.id);
    }
  };

  return (
    <Card className="border-2 border-[#D4AF37] hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <WineIcon className="w-5 h-5 text-[#D4AF37]" />
            <CardTitle>{wine.name}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/edit/${wine.id}`)}
              className="h-8 w-8 hover:bg-[#D4AF37]/10"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
        <CardDescription>
          {wine.type} • {wine.year} • {wine.region}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Rating</p>
            <HeartRating 
              rating={wine.rating} 
              onRatingChange={(rating) => onRatingChange(wine.id, rating)}
            />
          </div>
          {wine.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{wine.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
