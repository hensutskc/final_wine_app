import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Wine } from '../hooks/useWines';
import { HeartRating } from './HeartRating';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface WineFormProps {
  wine?: Wine;
  onSubmit: (wine: Omit<Wine, 'id'>) => void;
  title: string;
  description: string;
}

export function WineForm({ wine, onSubmit, title, description }: WineFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: wine?.name || '',
    type: wine?.type || '',
    year: wine?.year || '',
    region: wine?.region || '',
    rating: wine?.rating || 0,
    notes: wine?.notes || '',
  });

  useEffect(() => {
    if (wine) {
      setFormData({
        name: wine.name,
        type: wine.type,
        year: wine.year,
        region: wine.region,
        rating: wine.rating,
        notes: wine.notes || '',
      });
    }
  }, [wine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.year || !formData.region) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
    navigate('/cellar');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/cellar')}
        className="mb-4 hover:bg-[#D4AF37]/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Cellar
      </Button>

      <Card className="border-2 border-[#D4AF37]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Wine Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Château Margaux"
                className="border-[#D4AF37] focus-visible:ring-[#D4AF37]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Red, White, Rosé"
                  className="border-[#D4AF37] focus-visible:ring-[#D4AF37]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2018"
                  className="border-[#D4AF37] focus-visible:ring-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="e.g., Bordeaux, France"
                className="border-[#D4AF37] focus-visible:ring-[#D4AF37]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <HeartRating
                rating={formData.rating}
                onRatingChange={(rating) => setFormData({ ...formData, rating })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Tasting Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter your tasting notes and impressions..."
                className="border-[#D4AF37] focus-visible:ring-[#D4AF37] min-h-[100px]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-black"
              >
                {wine ? 'Update Wine' : 'Add Wine'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cellar')}
                className="border-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}