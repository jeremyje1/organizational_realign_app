export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About NorthPath Strategies</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            NorthPath Strategies helps organizations navigate complex structural challenges 
            through data-driven analysis and strategic realignment solutions.
          </p>
          <p className="text-lg text-gray-700">
            Our proprietary DSCH, CRF, and LEI algorithms provide comprehensive 
            organizational assessment and optimization recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}