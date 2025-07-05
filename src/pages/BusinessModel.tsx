
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Download, ArrowRight, Users, TrendingUp, Target, DollarSign, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BusinessModel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [idea, setIdea] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const fetchIdea = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching idea:', error);
        toast({
          title: "Error",
          description: "Failed to load business model",
          variant: "destructive",
        });
        return;
      }

      setIdea(data);
    } catch (error) {
      console.error('Error fetching idea:', error);
      toast({
        title: "Error", 
        description: "Failed to load business model",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading business model...</p>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Business Model Not Found</h3>
          <p className="text-gray-600 mb-4">The requested business model could not be found.</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Parse model output or use defaults
  const businessData = {
    title: idea.idea_text.length > 60 ? `${idea.idea_text.substring(0, 60)}...` : idea.idea_text,
    summary: idea.model_output || "AI-generated business model based on your submitted idea.",
    problem: "Market problem identified through AI analysis",
    solution: idea.idea_text,
    marketSize: "$TBD",
    competitors: ["Market analysis pending"],
    revenueModel: "Business model recommendations generated",
    mvpSteps: [
      { step: "Market Research & User Interviews", status: "completed", duration: "2 weeks" },
      { step: "Design MVP Wireframes", status: "completed", duration: "1 week" },
      { step: "Develop Core Algorithm", status: "in-progress", duration: "4 weeks" },
      { step: "Build Mobile App (iOS/Android)", status: "pending", duration: "6 weeks" },
      { step: "Beta Testing with 100 Users", status: "pending", duration: "2 weeks" },
      { step: "Launch & Marketing Campaign", status: "pending", duration: "4 weeks" }
    ]
  };

  const automationFlows = [
    {
      title: "User Onboarding Flow",
      platform: "Make.com",
      description: "Automatically send welcome emails, create user profiles, and trigger initial meal plan generation"
    },
    {
      title: "Weekly Meal Plan Delivery",
      platform: "Zapier",
      description: "Generate and send personalized meal plans every Sunday via email and push notification"
    },
    {
      title: "Grocery Shopping Integration",
      platform: "Make.com",
      description: "Sync meal plans with grocery delivery services like Instacart for one-click shopping"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IdeaForge AI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              Launch MVP
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Title Section */}
        <div className="mb-8">
          <Badge className="mb-4 bg-green-100 text-green-800">Business Model Generated</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{businessData.title}</h1>
          <p className="text-gray-600 text-lg">{businessData.summary}</p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-600" />
                    Problem Statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{businessData.problem}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                    Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{businessData.solution}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Business Model Canvas</CardTitle>
                <CardDescription>Key components of your business model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Key Partners</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Grocery delivery services</li>
                      <li>• Nutritionists & dietitians</li>
                      <li>• Recipe content creators</li>
                      <li>• Fitness app integrations</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Key Activities</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• AI algorithm development</li>
                      <li>• Content curation</li>
                      <li>• User acquisition</li>
                      <li>• Customer support</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Key Resources</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• AI/ML technology</li>
                      <li>• Nutrition database</li>
                      <li>• Development team</li>
                      <li>• User data & feedback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">{businessData.marketSize}</h3>
                  <p className="text-gray-600">Total Addressable Market</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">45M+</h3>
                  <p className="text-gray-600">Health-conscious users</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">23%</h3>
                  <p className="text-gray-600">Annual growth rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>Key competitors and differentiation opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessData.competitors.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{competitor}</h4>
                        <p className="text-sm text-gray-600">Established player with large user base</p>
                      </div>
                      <Badge variant="outline">Direct Competitor</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Revenue Model
                </CardTitle>
                <CardDescription>Multiple revenue streams for sustainable growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Primary: Premium Subscriptions</h4>
                    <p className="text-green-700 mb-3">{businessData.revenueModel}</p>
                    <div className="text-sm text-green-600">
                      <p>• Advanced meal planning features</p>
                      <p>• Unlimited recipe access</p>
                      <p>• Grocery integration</p>
                      <p>• Nutrition tracking & analytics</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Affiliate Commissions</h4>
                      <p className="text-blue-700 text-sm">15-20% commission from grocery delivery partnerships</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Premium Content</h4>
                      <p className="text-purple-700 text-sm">Dietitian-created meal plans and exclusive recipes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Execution Tab */}
          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>MVP Development Timeline</CardTitle>
                <CardDescription>Step-by-step roadmap to launch your minimum viable product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessData.mvpSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          step.status === 'completed' ? 'bg-green-100 text-green-800' :
                          step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold">{step.step}</h4>
                        <p className="text-sm text-gray-600">Duration: {step.duration}</p>
                      </div>
                      <Badge className={
                        step.status === 'completed' ? 'bg-green-100 text-green-800' :
                        step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }>
                        {step.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Link to="/tracker">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Start Execution Tracking <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Automation Workflows
                </CardTitle>
                <CardDescription>Streamline your operations with automated processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationFlows.map((flow, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <h4 className="font-semibold mb-1">{flow.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{flow.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {flow.platform}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          Setup
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessModel;
