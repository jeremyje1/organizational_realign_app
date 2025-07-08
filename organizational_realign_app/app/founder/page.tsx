import { Metadata } from 'next';
import FounderBio from '@/components/FounderBio';

export const metadata: Metadata = {
  title: 'Jeremy Estrella - Founder & Principal | NorthPath Strategies',
  description: 'Meet Jeremy Estrella, nationally recognized higher education leader and founder of NorthPath Strategies, specializing in systems strategy and student success architecture.',
};

export default function FounderPage() {
  return (
    <div className="bg-white">
      <FounderBio />
    </div>
  );
}
