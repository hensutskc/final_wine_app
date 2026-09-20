import { useWines } from '../hooks/useWines';
import { WineForm } from '../components/WineForm';

export function AddWine() {
  const { addWine } = useWines();

  return (
    <div className="min-h-screen bg-white">
      <WineForm
        onSubmit={addWine}
        title="Add New Wine"
        description="Add a new wine to your cellar collection"
      />
    </div>
  );
}
