import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Leveraging Google Gemini's advanced AI technology for superior text processing and understanding."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant results for all your writing needs with our optimized processing pipeline."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your text data is processed securely and never stored on our servers permanently."
    },
    {
      icon: Users,
      title: "User-Focused",
      description: "Designed with writers, students, and professionals in mind for maximum productivity."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About WriteAI</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empowering writers with intelligent AI tools to enhance, transform, 
            and perfect their content.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-surface">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              WriteAI is dedicated to democratizing access to advanced writing tools. 
              We believe that everyone deserves to communicate effectively, regardless 
              of their writing background or language proficiency.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By harnessing the power of Google Gemini AI, we provide professional-grade 
              writing assistance that helps users summarize complex texts, translate 
              across languages, correct grammar mistakes, expand ideas, and adapt tone 
              for any audience.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{value.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Powered by Google Gemini</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our platform is built on Google's state-of-the-art Gemini AI model, 
              ensuring you get the most accurate and contextually aware text processing 
              available today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-muted-foreground">Languages Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">&lt;2s</div>
                <div className="text-muted-foreground">Average Response Time</div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="p-8 bg-surface-subtle">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Writing?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Experience the power of AI-enhanced writing tools today.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/dashboard")}
              className="text-lg px-8 py-3"
            >
              Try WriteAI Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;