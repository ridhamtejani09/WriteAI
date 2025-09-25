import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Languages, CheckCircle, FileText, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Text Summarization",
      description: "Get concise summaries of long texts in seconds"
    },
    {
      icon: Languages,
      title: "Translation",
      description: "Translate text into multiple languages instantly"
    },
    {
      icon: CheckCircle,
      title: "Grammar & Spell Check",
      description: "Detect and correct grammar and spelling mistakes"
    },
    {
      icon: PenTool,
      title: "Content Expansion",
      description: "Expand short text into detailed, comprehensive content"
    },
    {
      icon: Sparkles,
      title: "Tone Transformation",
      description: "Convert text between formal, casual, professional tones"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              AI-Powered Writing Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your writing with our comprehensive suite of AI tools. 
              Summarize, translate, correct, expand, and refine your content with 
              the power of Google Gemini AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/dashboard")}
                className="text-lg px-8 py-3"
              >
                Start Writing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/about")}
                className="text-lg px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Writing Tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to enhance your writing, powered by advanced AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-smooth">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-subtle">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of writers who trust WriteAI for their content needs
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="text-lg px-8 py-3"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;