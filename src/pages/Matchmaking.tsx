
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lightbulb, Heart, X, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Matchmaking = () => {
  const [matches] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      type: "Co-founder",
      avatar: "/api/placeholder/150/150",
      title: "Full-Stack Developer & UI/UX Designer",
      company: "Previously at Google",
      matchReason: "Sarah's technical expertise in mobile app development perfectly complements your meal planning idea. She has experience building health-focused apps and is looking for a nutrition-focused startup to join.",
      compatibility: 92,
      skills: ["React Native", "Node.js", "UI/UX Design", "Health Tech"],
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      type: "Mentor",
      avatar: "/api/placeholder/150/150", 
      title: "Registered Dietitian & Nutrition Consultant",
      company: "Nutrition Experts Inc.",
      matchReason: "Dr. Rodriguez can provide the nutritional expertise your app needs. He's advised 3 successful health startups and specializes in personalized nutrition algorithms.",
      compatibility: 88,
      skills: ["Clinical Nutrition", "Health Tech", "Regulatory Compliance", "Product Advisory"],
      location: "Austin, TX"
    },
    {
      id: 3,
      name: "Jennifer Park",
      type: "Investor",
      avatar: "/api/placeholder/150/150",
      title: "Partner at HealthTech Ventures",
      company: "HealthTech Ventures",
      matchReason: "Jennifer's fund focuses on early-stage health and wellness startups. She led investments in 2 successful meal planning apps and is actively looking for AI-powered nutrition solutions.",
      compatibility: 85,
      skills: ["Series A Funding", "Health Tech", "Go-to-Market", "Strategic Partnerships"],
      location: "Boston, MA"
    }
  ]);

  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const handleLike = () => {
    console.log('Liked:', matches[currentMatchIndex].name);
    nextMatch();
  };

  const handlePass = () => {
    console.log('Passed:', matches[currentMatchIndex].name);
    nextMatch();
  };

  const nextMatch = () => {
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };

  const currentMatch = matches[currentMatchIndex];

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
            Find Your Perfect Business Match
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered matching with co-founders, mentors, and investors
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{matches.length}</h3>
              <p className="text-sm text-gray-600">Potential Matches</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{currentMatch.compatibility}%</h3>
              <p className="text-sm text-gray-600">Match Score</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">0</h3>
              <p className="text-sm text-gray-600">Connections Made</p>
            </CardContent>
          </Card>
        </div>

        {/* Match Card */}
        {currentMatch && (
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-4 border-white">
                    <AvatarImage src={currentMatch.avatar} />
                    <AvatarFallback>{currentMatch.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{currentMatch.name}</h2>
                    <p className="opacity-90">{currentMatch.title}</p>
                    <p className="text-sm opacity-75">{currentMatch.company}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    {currentMatch.type}
                  </Badge>
                  <span className="text-sm opacity-75">{currentMatch.location}</span>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Match Reason */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Why This Match?</h3>
                  <p className="text-gray-700">{currentMatch.matchReason}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Compatibility Score */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Compatibility Score</h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex-grow bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${currentMatch.compatibility}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-green-600">{currentMatch.compatibility}%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={handlePass}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Pass
                  </Button>
                  <Button
                    onClick={handleLike}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Connect
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message First
                </Button>
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <div className="text-center mt-6">
              <p className="text-gray-500">
                {currentMatchIndex + 1} of {matches.length} matches
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                {matches.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMatchIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No More Matches */}
        {currentMatchIndex >= matches.length && (
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-8 pb-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No More Matches</h3>
                <p className="text-gray-600 mb-4">
                  Check back later for new potential partners, or update your profile to get better matches.
                </p>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;
