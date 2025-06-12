
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, MessageSquare, Send, Sparkles, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Business Advisor, trained on thousands of successful business strategies and best practices. I can help you with pricing strategies, growth hacks, MVP testing, market validation, and much more. What would you like to discuss today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    {
      icon: DollarSign,
      text: "How should I price my product?",
      category: "Pricing"
    },
    {
      icon: TrendingUp,
      text: "What are effective growth hacking strategies?",
      category: "Growth"
    },
    {
      icon: Users,
      text: "How do I validate my market demand?",
      category: "Validation"
    },
    {
      icon: Sparkles,
      text: "What should my MVP include?",
      category: "MVP"
    }
  ];

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: getAIResponse(messageToSend),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (question: string) => {
    const responses = {
      pricing: "For pricing your product, consider these strategies:\n\n1. **Value-based pricing**: Price based on the value you deliver to customers\n2. **Competitive analysis**: Research what similar products charge\n3. **Cost-plus pricing**: Calculate your costs and add desired margin\n4. **Psychological pricing**: Use pricing strategies like $9.99 instead of $10\n\nStart with a higher price and adjust down if needed - it's harder to raise prices later. Consider offering multiple tiers to capture different customer segments.",
      
      growth: "Here are proven growth hacking strategies:\n\n1. **Referral programs**: Incentivize existing users to bring friends\n2. **Content marketing**: Create valuable content that attracts your target audience\n3. **Product-led growth**: Make your product so good it sells itself\n4. **Viral loops**: Build sharing into your product's core functionality\n5. **Partnerships**: Collaborate with complementary businesses\n\nFocus on one channel at a time and optimize before moving to the next. Track your metrics closely!",
      
      validation: "Market validation is crucial before building. Here's how:\n\n1. **Customer interviews**: Talk to 20-30 potential customers\n2. **Landing page tests**: Create a simple page and measure interest\n3. **MVP testing**: Build the smallest version that solves the core problem\n4. **Pre-sales**: Try to get customers to pay before you build\n5. **Social media polls**: Use social platforms to gauge interest\n\nLook for strong emotional reactions - people should be excited about your solution to their problem.",
      
      mvp: "Your MVP should include:\n\n1. **Core feature only**: Solve one main problem really well\n2. **Simple user interface**: Don't over-complicate the design\n3. **Basic analytics**: Track how users interact with your product\n4. **Feedback mechanism**: Easy way for users to give input\n5. **Essential onboarding**: Help users understand the value quickly\n\nRemember: MVP means Minimum *Viable* Product - it should work and provide value, just with fewer features."
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('price') || lowerQuestion.includes('pricing')) {
      return responses.pricing;
    } else if (lowerQuestion.includes('growth') || lowerQuestion.includes('hack')) {
      return responses.growth;
    } else if (lowerQuestion.includes('validate') || lowerQuestion.includes('market')) {
      return responses.validation;
    } else if (lowerQuestion.includes('mvp') || lowerQuestion.includes('minimum')) {
      return responses.mvp;
    } else {
      return "That's a great question! Based on my analysis of successful businesses, I'd recommend focusing on understanding your customers deeply first. Every successful business starts with solving a real problem that people are willing to pay for.\n\nCould you provide more context about your specific situation? I can give you more targeted advice once I understand your business better.";
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
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
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Summarize My Strategy
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI Business Advisor
          </h1>
          <p className="text-gray-600 text-lg">
            Get expert guidance trained on thousands of successful business strategies
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Popular topics to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleQuickQuestion(question.text)}
                  >
                    <question.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-xs">{question.category}</div>
                      <div className="text-xs text-gray-600 font-normal">{question.text}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Business Advisor Chat</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Online</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-grow overflow-y-auto space-y-4 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about business strategy, pricing, growth..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={() => handleSendMessage()} 
                    disabled={isTyping || !inputMessage.trim()}
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
