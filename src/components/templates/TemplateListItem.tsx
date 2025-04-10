
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, Eye, Building, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { useSelectedTemplate } from "@/context/SelectedTemplateContext";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { templatesData } from "@/data/templates";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  created: string;
  industry: string;
  author?: string;
  popularity?: number;
  timeEstimate?: string;
  elements?: any[];
}

interface TemplateListItemProps {
  template: Template;
}

export const TemplateListItem: React.FC<TemplateListItemProps> = ({ template }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brandSettings } = useBrandSettings();
  const { setSelectedTemplate } = useSelectedTemplate();
  const formCanvas = useFormCanvas();

  const handleUseTemplate = () => {
    // Find the full template with elements from the templatesData
    const fullTemplate = templatesData.find(t => t.id === template.id);
    
    if (fullTemplate && fullTemplate.elements) {
      try {
        // Deep clone the elements to avoid reference issues
        const templateElements = JSON.parse(JSON.stringify(fullTemplate.elements));
        
        // Set in global context
        setSelectedTemplate(fullTemplate);
        
        // Also directly set in form canvas for immediate use
        formCanvas.setElements(templateElements);
        
        toast({
          title: "Template Selected",
          description: `${template.title} template has been loaded.`,
        });
        
        navigate('/form-builder');
      } catch (error) {
        console.error("Error using template:", error);
        toast({
          title: "Error",
          description: "Unable to load template. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Unable to load template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Template Duplicated",
      description: `A copy of ${template.title} has been created.`,
    });
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Template Preview",
      description: `Opening preview for ${template.title}...`,
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
    <div 
      className="flex items-center border rounded-lg p-4 hover:bg-muted/50 cursor-pointer group transition-colors"
      onClick={handleUseTemplate}
    >
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={template.image} 
          alt={template.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex-grow overflow-hidden">
        <div className="flex items-center gap-2">
          <h3 className="font-medium truncate">{template.title}</h3>
          <Badge 
            variant="default" 
            className="text-xs"
            style={{ backgroundColor: brandSettings.colors.primary, color: "white" }}
          >
            {template.category}
          </Badge>
          {template.industry && (
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Building className="h-3 w-3" />
              {template.industry}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate mt-1">{template.description}</p>
        
        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(template.created)}
          </div>
          
          {template.timeEstimate && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {template.timeEstimate}
            </div>
          )}
          
          {template.author && (
            <div>{template.author}</div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 ml-4">
        <Button 
          size="sm" 
          variant="ghost"
          onClick={handlePreview}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={handleDuplicate}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            handleUseTemplate();
          }}
          style={{ backgroundColor: brandSettings.colors.primary }}
        >
          Use
        </Button>
      </div>
    </div>
  );
};
