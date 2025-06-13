import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Lightbulb, Users, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [ideas] = useState([
    {
      id: 1,
      title: "AI-Powered Meal Planning App",
      description: "Personalized meal plans based on dietary preferences and health goals",
      status: "Partner Matched",
      createdAt: "2024-01-15",
      industry: "Health Tech"
    },
    {
      id: 2,
      title: "Sustainable Fashion Marketplace",
      description: "Platform connecting eco-conscious consumers with sustainable fashion brands",
      status: "In Progress",
      createdAt: "2024-01-12",
      industry: "E-commerce"
    },
    {
      id: 3,
      title: "Local Tutoring Network",
      description: "Community-based platform for connecting students with local tutors",
      status: "Idea Generated",
      createdAt: "2024-01-10",
      industry: "Education"
    }
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Partner Matched':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Idea Generated':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IdeaForge AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/ai-advisor">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Advisor
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Ready to turn your next big idea into reality?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/submit-idea">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 border-blue-300 bg-blue-50">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Plus className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-blue-900">Submit New Idea</h3>
                <p className="text-sm text-blue-600 text-center">Get AI-powered business model</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/matchmaking">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Users className="w-8 h-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Find Partners</h3>
                <p className="text-sm text-gray-600 text-center">Connect with complementary businesses</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/tracker">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900">Track Progress</h3>
                <p className="text-sm text-gray-600 text-center">Monitor your business execution</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/ai-advisor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900">AI Advisor</h3>
                <p className="text-sm text-gray-600 text-center">Get expert business guidance</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Active Ideas */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Active Ideas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {idea.industry}
                    </Badge>
                    <Badge className={getStatusColor(idea.status)}>
                      {idea.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Created {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                    <Link to={`/business-model/${idea.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
