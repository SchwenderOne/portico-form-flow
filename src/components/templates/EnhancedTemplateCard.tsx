
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Copy, 
  Eye, 
  Star, 
  Clock,
  Building,
  ImageOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { useSelectedTemplate } from "@/context/SelectedTemplateContext";
import { templatesData } from "@/data/templates";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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

interface EnhancedTemplateCardProps {
  template: Template;
}

export const EnhancedTemplateCard: React.FC<EnhancedTemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brandSettings } = useBrandSettings();
  const { setSelectedTemplate } = useSelectedTemplate();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleUseTemplate = () => {
    setIsLoading(true);
    
    // Find the full template with elements from the templatesData
    const fullTemplate = templatesData.find(t => t.id === template.id);
    
    if (fullTemplate && fullTemplate.elements) {
      try {
        // Set in global context
        setSelectedTemplate(fullTemplate);
        
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
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Unable to load template. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
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
    setIsPreviewOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get the full template with elements for preview
  const fullTemplate = templatesData.find(t => t.id === template.id);

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-primary/10" 
        onClick={handleUseTemplate}
      >
        <div className="h-48 bg-muted relative overflow-hidden">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageOff className="h-12 w-12 text-muted-foreground/50" />
            </div>
          ) : (
            <img 
              src={template.image} 
              alt={template.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge 
              className="text-xs py-1 px-2"
              style={{ backgroundColor: brandSettings.colors.primary, color: "white" }}
            >
              {template.category}
            </Badge>
          </div>
          <div className="absolute left-2 bottom-2">
            {template.industry && (
              <Badge variant="secondary" className="text-xs py-1 px-2 flex items-center gap-1 bg-white/80">
                <Building className="h-3 w-3" />
                {template.industry}
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{template.title}</h3>
            {template.popularity && (
              <div className="flex items-center text-amber-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs ml-1">{template.popularity}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
          
          {(template.author || template.timeEstimate) && (
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              {template.author && <div className="truncate max-w-[150px]">{template.author}</div>}
              {template.timeEstimate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  {template.timeEstimate}
                </div>
              )}
            </div>
          )}
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
              onClick={handlePreview}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isLoading}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handleDuplicate}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isLoading}
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
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Use"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Template Preview Dialog */}
      {fullTemplate && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{fullTemplate.title}</DialogTitle>
              <DialogDescription>
                {fullTemplate.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 mt-4 overflow-hidden">
              <div className="border rounded-md p-6 bg-slate-50 max-h-[500px] overflow-y-auto">
                <div className="space-y-6">
                  {fullTemplate.elements?.map((element) => (
                    <div key={element.id} className="border border-dashed border-gray-300 p-4 rounded-md">
                      {element.type === "header" && (
                        <h2 className="text-xl font-bold">{element.content}</h2>
                      )}
                      {element.type === "text" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="text"
                            placeholder={element.placeholder}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                          {element.helpText && (
                            <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
                          )}
                        </div>
                      )}
                      {element.type === "email" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="email"
                            placeholder={element.placeholder}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                        </div>
                      )}
                      {element.type === "textarea" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <textarea
                            placeholder={element.placeholder}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                            rows={3}
                          />
                        </div>
                      )}
                      {element.type === "select" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <select
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          >
                            <option value="">Select an option</option>
                            {(element.options)?.map((option: string, i: number) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      {element.type === "date" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="date"
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsPreviewOpen(false);
                handleUseTemplate();
              }}>
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
