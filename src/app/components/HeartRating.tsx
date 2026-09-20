import { Heart } from 'lucide-react';

interface HeartRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

export function HeartRating({ rating, onRatingChange, readonly = false }: HeartRatingProps) {
  const hearts = [1, 2, 3, 4, 5];

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex gap-1">
      {hearts.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          disabled={readonly}
          className={`transition-all ${!readonly ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
        >
          <Heart
            className={`w-6 h-6 ${
              value <= rating
                ? 'fill-[#D4AF37] stroke-[#D4AF37]'
                : 'fill-none stroke-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
