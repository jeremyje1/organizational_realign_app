import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Profile - NorthPath Strategies',
  description: 'Learn about NorthPath Strategies - transforming institutions through strategic systems realignment and data-driven solutions.',
};

export default function CompanyProfilePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              NorthPath Strategies Company Profile
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Strategic Systems Realignment | Student Success Architecture | Higher Ed Transformation
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">About NorthPath Strategies</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                NorthPath Strategies specializes in strategically realigning and redefining organizational systems 
                and structures to unlock leaders' potential and empower effective execution. We partner with 
                forward-thinking organizations committed to operational excellence, clear strategic direction, 
                and sustainable systemic change.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6">
                To redefine and realign organizational structures and systems, enabling leaders to thrive, 
                execute effectively, and achieve sustained success.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700 mb-6">
                To become the preferred strategic partner in driving systemic and structural transformations 
                that empower organizations to achieve operational clarity, effectiveness, and resilience.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Industries Served</h3>
              <ul className="text-lg text-gray-700 mb-6">
                <li>Higher Education Institutions</li>
                <li>Nonprofit Organizations</li>
                <li>Government Agencies</li>
                <li>Corporate Enterprises</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
