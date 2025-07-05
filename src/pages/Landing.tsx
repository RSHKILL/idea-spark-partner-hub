
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {

  const features = [
    {
      icon: Lightbulb,
      title: "AI Business Model Generation",
      description: "Transform any idea into a comprehensive business plan with market analysis and execution steps"
    },
    {
      icon: Users,
      title: "Smart Partner Matching",
      description: "Connect with complementary businesses, investors, and mentors based on AI-powered compatibility"
    },
    {
      icon: TrendingUp,
      title: "Execution Tracking",
      description: "Step-by-step guidance with automation workflows and KPI tracking for your business launch"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Entrepreneur",
      content: "Turned my vague SaaS idea into a $50K MRR business in 6 months with the AI-generated roadmap."
    },
    {
      name: "Marcus Rodriguez",
      role: "Restaurant Owner",
      content: "Found my perfect co-founder through the matchmaking feature. We're launching our second location!"
    },
    {
      name: "Emma Thompson",
      role: "Consultant",
      content: "The AI advisor is like having a business mentor available 24/7. Game-changer for my consulting practice."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IdeaForge AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Launch Your Business Idea with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Power
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform any business idea into a comprehensive strategy with AI-generated business models, 
            execution plans, and smart partner matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Launch Your Idea with AI <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Build Your Business
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories from Our Community
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Idea?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of entrepreneurs who've launched successful businesses with AI guidance
          </p>
          <Link to="/auth">
            <Button 
              size="lg" 
              variant="secondary"
            >
              Start Building Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">IdeaForge AI</span>
          </div>
          <p className="text-gray-400">
            © 2024 IdeaForge AI. All rights reserved. Built with AI-powered innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
