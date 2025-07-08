'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building, GraduationCap, Heart, ArrowRight } from 'lucide-react';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { Button } from '@/components/ui/button';
import { PagesBackground } from '@/components/ui/pages-background';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

const sampleReports = [
	{
		title: 'Healthcare Organization',
		description:
			'Comprehensive assessment of a 500+ bed hospital system, focusing on operational efficiency and patient care alignment.',
		icon: Heart,
		href: '/sample-reports/hospital',
		industry: 'Healthcare',
		size: '500+ beds',
		highlights: [
			'Patient Care Optimization',
			'Staff Alignment',
			'Operational Efficiency',
		],
	},
	{
		title: 'Public University',
		description:
			'Strategic assessment of a major state university with focus on academic excellence and administrative efficiency.',
		icon: GraduationCap,
		href: '/sample-reports/university',
		industry: 'Higher Education',
		size: '25,000+ students',
		highlights: ['Academic Alignment', 'Administrative Efficiency', 'Student Success'],
	},
	{
		title: 'Community College',
		description:
			'Organizational assessment for a community college system serving diverse student populations.',
		icon: Building,
		href: '/sample-reports/community-college',
		industry: 'Education',
		size: '15,000+ students',
		highlights: [
			'Community Engagement',
			'Student Services',
			'Resource Optimization',
		],
	},
];

export default function SampleReportsPage() {
	return (
		<PagesBackground>
			<PageWrapper>
				<div className="container mx-auto px-6 py-24">
					<div className="max-w-6xl mx-auto">
						{/* Header */}
						<motion.div
							className="text-center mb-16"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
								Sample Assessment Reports
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
								Explore comprehensive organizational assessments across different
								industries. See how our AI-powered analysis delivers actionable
								insights for transformation.
							</p>
						</motion.div>

						{/* Sample Reports Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
							{sampleReports.map((report, index) => (
								<motion.div
									key={report.title}
									className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									whileHover={{ y: -5 }}
								>
									<div className="p-8">
										<div className="flex items-center mb-6">
											<div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
												<report.icon className="w-6 h-6 text-white" />
											</div>
											<div>
												<h3 className="text-xl font-bold text-gray-900 dark:text-white">
													{report.title}
												</h3>
												<p className="text-sm text-gray-500 dark:text-gray-400">
													{report.industry} • {report.size}
												</p>
											</div>
										</div>

										<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
											{report.description}
										</p>

										<div className="mb-6">
											<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
												Key Focus Areas:
											</h4>
											<ul className="space-y-2">
												{report.highlights.map((highlight, idx) => (
													<li
														key={idx}
														className="flex items-center text-sm text-gray-600 dark:text-gray-300"
													>
														<div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
														{highlight}
													</li>
												))}
											</ul>
										</div>

										<SafeLink href={report.href}>
											<Button className="w-full group">
												View Full Report
												<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
											</Button>
										</SafeLink>
									</div>
								</motion.div>
							))}
						</div>

						{/* CTA Section */}
						<motion.div
							className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<h2 className="text-3xl font-bold mb-4">
								Ready for Your Own Assessment?
							</h2>
							<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
								Get personalized insights for your organization with our
								AI-powered assessment platform.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<SafeLink href="/assessment/start">
									<Button
										size="lg"
										variant="outline"
										className="bg-white text-primary-600 hover:bg-gray-100"
									>
										Start Your Assessment
										<ArrowRight className="w-5 h-5 ml-2" />
									</Button>
								</SafeLink>
								<SafeLink href="#contact">
									<Button
										size="lg"
										variant="outline"
										className="border-white text-white hover:bg-white/10"
									>
										Schedule Consultation
									</Button>
								</SafeLink>
							</div>
						</motion.div>
					</div>
				</div>
			</PageWrapper>
		</PagesBackground>
	);
}
