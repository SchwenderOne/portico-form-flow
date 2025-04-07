
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  created: string;
}

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUseTemplate = () => {
    toast({
      title: "Template Selected",
      description: `${template.title} template has been loaded.`,
    });
    navigate('/');
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Template Duplicated",
      description: `A copy of ${template.title} has been created.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={handleUseTemplate}>
      <div className="h-48 bg-muted relative overflow-hidden">
        <img 
          src={template.image} 
          alt={template.title}
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute top-2 right-2 bg-portico-purple text-white text-xs py-1 px-2 rounded-full">
          {template.category}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{template.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(template.created)}
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleDuplicate}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={(e) => {
            e.stopPropagation();
            handleUseTemplate();
          }}>
            Use Template
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
