
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TemplateData } from "@/types/template";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TemplateCardProps {
  template: TemplateData;
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    onSelect();
    navigate("/form-builder");
    toast.success(`Template "${template.title}" has been loaded.`);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open a new window with minimal template preview
    const previewWindow = window.open("", "_blank");
    if (!previewWindow) {
      toast.error("Unable to open preview. Please allow popups for this site.");
      return;
    }
    
    // Create a simple HTML template for preview
    const previewHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview: ${template.title}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold mb-6">${template.title}</h1>
          <p class="text-gray-600 mb-8">${template.description}</p>
          
          <div class="space-y-6">
            ${template.elements.map(elem => {
              if (elem.type === 'header') {
                return `<h2 class="text-xl font-bold mt-6">${elem.content}</h2>`;
              } else if (elem.type === 'text' || elem.type === 'email') {
                return `
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${elem.label}${elem.required ? ' *' : ''}</label>
                    <input type="${elem.type}" placeholder="${elem.placeholder || ''}" 
                      class="w-full p-2 border border-gray-300 rounded" ${elem.required ? 'required' : ''}>
                  </div>
                `;
              } else if (elem.type === 'textarea') {
                return `
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${elem.label}${elem.required ? ' *' : ''}</label>
                    <textarea placeholder="${elem.placeholder || ''}" 
                      class="w-full p-2 border border-gray-300 rounded h-24" ${elem.required ? 'required' : ''}></textarea>
                  </div>
                `;
              } else if (elem.type === 'select') {
                const options = elem.options || [];
                return `
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${elem.label}${elem.required ? ' *' : ''}</label>
                    <select class="w-full p-2 border border-gray-300 rounded" ${elem.required ? 'required' : ''}>
                      <option value="">Select an option</option>
                      ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                  </div>
                `;
              } else if (elem.type === 'checkbox') {
                return `
                  <div class="mb-4 flex items-center">
                    <input type="checkbox" id="${elem.id}" class="mr-2" ${elem.required ? 'required' : ''}>
                    <label for="${elem.id}" class="text-sm">${elem.label}</label>
                  </div>
                `;
              } else if (elem.type === 'date') {
                return `
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${elem.label}${elem.required ? ' *' : ''}</label>
                    <input type="date" class="w-full p-2 border border-gray-300 rounded" ${elem.required ? 'required' : ''}>
                  </div>
                `;
              } else if (elem.type === 'number') {
                return `
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-2">${elem.label}${elem.required ? ' *' : ''}</label>
                    <input type="number" placeholder="${elem.placeholder || ''}" 
                      class="w-full p-2 border border-gray-300 rounded" ${elem.required ? 'required' : ''}>
                  </div>
                `;
              }
              return '';
            }).join('')}
          </div>
          
          <div class="mt-8 flex justify-end">
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
          </div>
        </div>
        <div class="text-center mt-4 text-sm text-gray-500">
          <p>This is a preview only. Form submission is not functional.</p>
        </div>
      </body>
      </html>
    `;
    
    previewWindow.document.write(previewHTML);
    previewWindow.document.close();
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
          onClick={handlePreview}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
};
