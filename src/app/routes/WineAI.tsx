import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Sparkles, Wine } from 'lucide-react';

interface Recommendation {
  name: string;
  type: string;
  region: string;
  year: string;
  description: string;
  pairsWith: string[];
  priceRange: string;
}

const mockRecommendations: Recommendation[] = [
  {
    name: 'Château Pichon Longueville',
    type: 'Red',
    region: 'Pauillac, Bordeaux',
    year: '2016',
    description: 'A powerful yet elegant Bordeaux blend with notes of blackcurrant, cedar, and graphite. Perfect structure and long aging potential.',
    pairsWith: ['Grilled ribeye', 'Lamb chops', 'Aged cheeses'],
    priceRange: '$80-$120',
  },
  {
    name: 'Domaine Leflaive Puligny-Montrachet',
    type: 'White',
    region: 'Burgundy, France',
    year: '2019',
    description: 'Refined Chardonnay with precise minerality, citrus notes, and subtle oak. Exceptional balance and complexity.',
    pairsWith: ['Lobster', 'Sea bass', 'Creamy risotto'],
    priceRange: '$90-$130',
  },
  {
    name: 'Tenuta San Guido Sassicaia',
    type: 'Red',
    region: 'Bolgheri, Tuscany',
    year: '2018',
    description: 'Iconic Super Tuscan with Cabernet Sauvignon dominance. Rich dark fruit, elegant tannins, and Mediterranean herbs.',
    pairsWith: ['Wild boar', 'Tuscan steak', 'Mushroom dishes'],
    priceRange: '$150-$200',
  },
];

export function WineAI() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRecommendations = () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/home')}
          className="mb-4 hover:bg-[#D4AF37]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-10 h-10 text-[#D4AF37]" />
          <div>
            <h1 className="text-3xl">MyWine AI</h1>
            <p className="text-muted-foreground">
              Get personalized wine recommendations powered by AI
            </p>
          </div>
        </div>

        <Card className="border-2 border-[#D4AF37] mb-6">
          <CardHeader>
            <CardTitle>What are you looking for?</CardTitle>
            <CardDescription>
              Describe your preferences, occasion, or food pairing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I'm looking for a full-bodied red wine to pair with grilled steak, budget around $100..."
              className="border-[#D4AF37] focus-visible:ring-[#D4AF37] min-h-[100px]"
            />
            <Button
              onClick={handleGetRecommendations}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Recommendations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl">Recommended for You</h2>
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-2 border-[#D4AF37]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Wine className="w-5 h-5 text-[#D4AF37]" />
                      <CardTitle>{rec.name}</CardTitle>
                    </div>
                    <Badge className="bg-[#D4AF37]/10 text-black border border-[#D4AF37]">
                      {rec.priceRange}
                    </Badge>
                  </div>
                  <CardDescription>
                    {rec.type} • {rec.year} • {rec.region}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{rec.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">Pairs well with:</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.pairsWith.map((food, i) => (
                        <Badge key={i} variant="outline" className="border-[#D4AF37]">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {recommendations.length === 0 && !isLoading && (
          <div className="text-center py-16 border-2 border-dashed border-[#D4AF37] rounded-lg">
            <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-50" />
            <h2 className="text-xl mb-2">AI-Powered Recommendations</h2>
            <p className="text-muted-foreground">
              Tell us what you're looking for and we'll suggest the perfect wines
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
