import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Copy, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("spanish");
  const [selectedTone, setSelectedTone] = useState("formal");
  const { toast } = useToast();

  // Hardcoded Gemini API key
  const GEMINI_API_KEY = "AIzaSyAHEuDJbkC75-eaLGBpAPPhnoxWIDXYdgw";

  const languages = [
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
  ];

  const tones = [
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
    { value: "professional", label: "Professional" },
    { value: "creative", label: "Creative" },
    { value: "friendly", label: "Friendly" },
    { value: "persuasive", label: "Persuasive" },
  ];

const callGeminiAPI = async (prompt: string) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response generated"
  );
};

  const handleProcess = async (tool: string) => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to process.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let prompt = "";
      
      switch (tool) {
        case "summarization":
          prompt = `Please provide a clear and concise summary of the following text. Focus on the main points and key information:\n\n${inputText}`;
          break;
        case "translation":
          prompt = `Translate the following text to ${selectedLanguage}. Maintain the original meaning and tone:\n\n${inputText}`;
          break;
        case "grammar":
          prompt = `Please correct any grammar and spelling mistakes in the following text. Return only the corrected version:\n\n${inputText}`;
          break;
        case "expansion":
          prompt = `Please expand the following text into a more detailed and comprehensive version. Add relevant context, examples, and explanations while maintaining the original meaning:\n\n${inputText}`;
          break;
        case "tone":
          prompt = `Please rewrite the following text in a ${selectedTone} tone. Maintain the original meaning but adjust the style accordingly:\n\n${inputText}`;
          break;
        default:
          prompt = inputText;
      }
      
      const result = await callGeminiAPI(prompt);
      setOutputText(result);
      
      toast({
        title: "Processing Complete",
        description: "Your text has been processed successfully.",
      });
    } catch (error) {
      console.error("Error processing text:", error);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your text.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    });
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "writeai-output.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Writing Dashboard</h1>
          <p className="text-muted-foreground">
            Choose a tool below and transform your text with AI
          </p>
        </div>

        <Tabs defaultValue="summarization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summarization">Summarize</TabsTrigger>
            <TabsTrigger value="translation">Translate</TabsTrigger>
            <TabsTrigger value="grammar">Grammar</TabsTrigger>
            <TabsTrigger value="expansion">Expand</TabsTrigger>
            <TabsTrigger value="tone">Tone</TabsTrigger>
          </TabsList>

          {/* Summarization */}
          <TabsContent value="summarization">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Text Summarization</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Enter the text you want to summarize..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px]"
                  />
                  <Button 
                    onClick={() => handleProcess("summarization")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Summarize Text
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Summary Output</Label>
                    {outputText && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={downloadText}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Summary will appear here..."
                    className="min-h-[300px] bg-surface-subtle"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Translation */}
          <TabsContent value="translation">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Text Translation</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    placeholder="Enter the text you want to translate..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[250px]"
                  />
                  <div className="space-y-2">
                    <Label>Target Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => handleProcess("translation")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Translate Text
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Translation Output</Label>
                    {outputText && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={downloadText}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Translation will appear here..."
                    className="min-h-[300px] bg-surface-subtle"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Grammar Check */}
          <TabsContent value="grammar">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Grammar & Spell Check</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    placeholder="Enter the text you want to check..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px]"
                  />
                  <Button 
                    onClick={() => handleProcess("grammar")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Check Grammar
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Corrected Text</Label>
                    {outputText && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={downloadText}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Corrected text will appear here..."
                    className="min-h-[300px] bg-surface-subtle"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Content Expansion */}
          <TabsContent value="expansion">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Content Expansion</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    placeholder="Enter the short text you want to expand..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px]"
                  />
                  <Button 
                    onClick={() => handleProcess("expansion")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Expand Content
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Expanded Content</Label>
                    {outputText && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={downloadText}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Expanded content will appear here..."
                    className="min-h-[300px] bg-surface-subtle"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tone Transformation */}
          <TabsContent value="tone">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tone Transformation</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    placeholder="Enter the text whose tone you want to change..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[250px]"
                  />
                  <div className="space-y-2">
                    <Label>Target Tone</Label>
                    <Select value={selectedTone} onValueChange={setSelectedTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => handleProcess("tone")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Transform Tone
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Transformed Text</Label>
                    {outputText && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={downloadText}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="Transformed text will appear here..."
                    className="min-h-[300px] bg-surface-subtle"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;