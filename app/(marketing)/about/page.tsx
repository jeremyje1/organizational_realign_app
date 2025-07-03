// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">About NorthPath Strategies</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 mb-6">
              NorthPath Strategies is dedicated to helping higher education institutions navigate 
              complex organizational challenges and achieve sustainable excellence.
            </p>
            <p className="text-slate-300 mb-6">
              Our comprehensive assessment platform helps institutions identify areas for improvement 
              and develop data-driven strategies for organizational realignment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}