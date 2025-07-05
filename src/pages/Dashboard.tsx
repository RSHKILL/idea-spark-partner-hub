
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Lightbulb, Users, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Idea {
  id: string;
  idea_text: string;
  model_output: string | null;
  created_at: string;
  user_id: string;
}

const Dashboard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user?.email) {
          setUserEmail(session.user.email);
          // Defer the fetchIdeas call to avoid auth callback issues
          setTimeout(() => {
            fetchIdeas(session.user.email!);
          }, 0);
        } else {
          setUserEmail(null);
          setIdeas([]);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        fetchIdeas(session.user.email);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully signed out",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const fetchIdeas = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ideas:', error);
        toast({
          title: "Error",
          description: "Failed to load your ideas",
          variant: "destructive",
        });
        return;
      }

      setIdeas(data || []);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      toast({
        title: "Error",
        description: "Failed to load your ideas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusFromModelOutput = (modelOutput: string | null) => {
    if (!modelOutput) return 'Idea Submitted';
    if (modelOutput.includes('business model') || modelOutput.includes('revenue')) return 'Business Model Generated';
    return 'AI Analysis Complete';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Business Model Generated':
        return 'bg-green-100 text-green-800';
      case 'AI Analysis Complete':
        return 'bg-blue-100 text-blue-800';
      case 'Idea Submitted':
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
            {userEmail ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Ready to turn your next big idea into reality?</p>
          {userEmail && (
            <p className="text-sm text-gray-500 mt-1">Logged in as: {userEmail}</p>
          )}
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
          
          {!userEmail ? (
            <Card className="text-center py-12">
              <CardContent>
                <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Please Sign In</h3>
                <p className="text-gray-600 mb-4">
                  You need to be signed in to view and manage your ideas.
                </p>
                <Link to="/auth">
                  <Button>Sign In</Button>
                </Link>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Ideas Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by submitting your first business idea and let our AI help you develop it.
                </p>
                <Link to="/submit-idea">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your First Idea
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => {
                const status = getStatusFromModelOutput(idea.model_output);
                return (
                  <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="text-xs">
                          AI Generated
                        </Badge>
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        {idea.idea_text.length > 60 
                          ? `${idea.idea_text.substring(0, 60)}...` 
                          : idea.idea_text
                        }
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {idea.model_output 
                          ? (idea.model_output.length > 120 
                              ? `${idea.model_output.substring(0, 120)}...` 
                              : idea.model_output)
                          : "AI analysis pending..."
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Created {new Date(idea.created_at).toLocaleDateString()}
                        </span>
                        <Link to={`/business-model/${idea.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
