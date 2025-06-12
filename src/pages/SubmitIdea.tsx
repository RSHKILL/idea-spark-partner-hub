
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SubmitIdea = () => {
  const [idea, setIdea] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [stage, setStage] = useState('');
  const [region, setRegion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const industries = [
    'Technology', 'Healthcare', 'E-commerce', 'Education', 'Finance', 
    'Food & Beverage', 'Entertainment', 'Sustainability', 'B2B Services', 'Other'
  ];

  const stages = [
    'Just an Idea', 'Market Research Done', 'Have a Prototype', 'Ready to Scale'
  ];

  const regions = [
    'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa', 'Global'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      toast({
        title: "Error",
        description: "Please describe your business idea",
        variant: "destructive",
      });
      return;
    }

    if (!userEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log("Sending request to Make.com webhook...");
      
      const response = await fetch('https://hook.us2.make.com/fyxmlxo47g2urtugzrsihcn7exbvlfr8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: idea,
          user_id: userEmail,
        }),
      });

      console.log("Webhook response:", response.status);

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your business idea has been submitted for AI analysis",
        });
        navigate('/business-model/new');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending webhook:", error);
      toast({
        title: "Error",
        description: "Failed to submit your idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your Idea with AI
          </h1>
          <p className="text-gray-600 text-lg">
            Describe your business idea and get a comprehensive business model with execution plans
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Your Business Idea
                </CardTitle>
                <CardDescription>
                  Don't worry if it's not perfect - our AI will help you refine and develop it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">
                      Your Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="mt-2"
                      disabled={isGenerating}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="idea" className="text-base font-medium">
                      Describe your business idea *
                    </Label>
                    <Textarea
                      id="idea"
                      placeholder="Example: I want to create an app that helps people track their water intake and reminds them to stay hydrated throughout the day..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="mt-2 min-h-32 resize-none"
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="industry" className="text-base font-medium">
                        Industry (Optional)
                      </Label>
                      <Select value={industry} onValueChange={setIndustry} disabled={isGenerating}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind.toLowerCase()}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="stage" className="text-base font-medium">
                        Current Stage
                      </Label>
                      <Select value={stage} onValueChange={setStage} disabled={isGenerating}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {stages.map((st) => (
                            <SelectItem key={st} value={st.toLowerCase().replace(/\s+/g, '-')}>
                              {st}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="region" className="text-base font-medium">
                        Target Region
                      </Label>
                      <Select value={region} onValueChange={setRegion} disabled={isGenerating}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((reg) => (
                            <SelectItem key={reg} value={reg.toLowerCase().replace(/\s+/g, '-')}>
                              {reg}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Launching Your Idea with AI...
                      </>
                    ) : (
                      <>
                        Launch Your Idea with AI <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Complete Business Model</p>
                    <p className="text-xs text-gray-600">Canvas with all key components</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Market Analysis</p>
                    <p className="text-xs text-gray-600">Size, competitors, opportunities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Execution Plan</p>
                    <p className="text-xs text-gray-600">Step-by-step MVP roadmap</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Revenue Strategies</p>
                    <p className="text-xs text-gray-600">Monetization recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600">
                    Our AI analyzes thousands of successful businesses to create your personalized strategy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdea;
