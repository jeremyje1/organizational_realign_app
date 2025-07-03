// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
              <p className="text-slate-300 mb-6">
                Ready to transform your institution? Contact our team of experts to learn more 
                about how NorthPath Strategies can help.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-slate-300">contact@northpathstrategies.org</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="text-slate-300">Coming Soon</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Schedule a Consultation</h2>
              <p className="text-slate-300 mb-6">
                Book a free consultation to discuss your institution&apos;s specific needs and challenges.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}