
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TemplateData } from "@/types/template";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface TemplateCardProps {
  template: TemplateData;
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    onSelect();
    navigate("/form-builder");
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <div 
        className="h-36 bg-cover bg-center" 
        style={{ backgroundImage: `url(${template.image})` }}
      />
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{template.title}</CardTitle>
        <CardDescription className="text-sm">
          {template.category} • {template.industry}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        {template.timeEstimate && (
          <Badge variant="outline" className="mt-2">
            {template.timeEstimate} to complete
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          size="sm"
          className="gap-1"
          onClick={handleUseTemplate}
        >
          Use Template
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={() => window.open(`/preview/${template.id}`, '_blank')}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
};
