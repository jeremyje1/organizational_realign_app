export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact NorthPath Strategies</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-6">
                Ready to transform your organization? Contact us to learn more about our 
                strategic realignment solutions.
              </p>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> contact@northpathstrategies.org
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> Available upon request
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h2>
              <p className="text-lg text-gray-700 mb-6">
                Begin your organizational assessment today with our comprehensive analysis platform.
              </p>
              <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}