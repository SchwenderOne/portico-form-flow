
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Code } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BrandSettings } from "@/types/brand";

interface EmbedCodeGeneratorProps {
  formUrl: string;
  brandSettings: BrandSettings;
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({ formUrl, brandSettings }) => {
  const { toast } = useToast();
  const [responsive, setResponsive] = useState(true);
  const [embedSize, setEmbedSize] = useState("medium");
  const [showBranding, setShowBranding] = useState(true);

  const sizes = {
    small: { width: 400, height: 500 },
    medium: { width: 600, height: 700 },
    large: { width: 800, height: 900 },
    custom: { width: 600, height: 700 },
  };

  const [customSize, setCustomSize] = useState(sizes.medium);

  const getIframeCode = () => {
    const { width, height } = sizes[embedSize as keyof typeof sizes] || customSize;
    const responsiveStyles = responsive 
      ? 'width="100%" style="min-height: 500px; max-width: 800px;"' 
      : `width="${width}" height="${height}"`;
    
    return `<iframe 
  src="${formUrl}${showBranding ? '' : '?hideBranding=true'}" 
  ${responsiveStyles}
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; geolocation; picture-in-picture"
  allowfullscreen
></iframe>`;
  };

  const getJavaScriptCode = () => {
    return `<div id="portico-form-container"></div>
<script src="https://cdn.portico.app/embed.js"></script>
<script>
  PorticoForms.initialize({
    formUrl: "${formUrl}",
    container: "#portico-form-container",
    responsive: ${responsive},
    ${!responsive ? `width: ${sizes[embedSize as keyof typeof sizes].width},` : ''}
    ${!responsive ? `height: ${sizes[embedSize as keyof typeof sizes].height},` : ''}
    hideBranding: ${!showBranding},
    theme: {
      primaryColor: "${brandSettings.colors.primary}",
      fontFamily: "${brandSettings.typography.fontFamily}"
    }
  });
</script>`;
  };

  const getWordPressCode = () => {
    return `[portico_form url="${formUrl}" responsive="${responsive ? 'true' : 'false'}" ${!responsive ? `width="${sizes[embedSize as keyof typeof sizes].width}" height="${sizes[embedSize as keyof typeof sizes].height}"` : ''} hide_branding="${!showBranding ? 'true' : 'false'}"]`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Form</CardTitle>
        <CardDescription>
          Add your form directly to your website or CMS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch 
                id="responsive" 
                checked={responsive}
                onCheckedChange={setResponsive}
              />
              <Label htmlFor="responsive">Responsive</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="branding" 
                checked={showBranding}
                onCheckedChange={setShowBranding}
              />
              <Label htmlFor="branding">Show Portico branding</Label>
            </div>
          </div>

          {!responsive && (
            <div>
              <Label htmlFor="embed-size">Embed size</Label>
              <Select 
                value={embedSize}
                onValueChange={setEmbedSize}
              >
                <SelectTrigger id="embed-size" className="mt-1">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (400×500)</SelectItem>
                  <SelectItem value="medium">Medium (600×700)</SelectItem>
                  <SelectItem value="large">Large (800×900)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Tabs defaultValue="iframe">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="iframe">iFrame</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
          </TabsList>

          <TabsContent value="iframe" className="space-y-4">
            <div>
              <Label htmlFor="iframe-code">iFrame Embed Code</Label>
              <Textarea 
                id="iframe-code"
                className="font-mono text-sm mt-2" 
                rows={6} 
                value={getIframeCode()} 
                readOnly 
              />
            </div>
            <Button onClick={() => copyToClipboard(getIframeCode())}>
              <Copy className="mr-2 h-4 w-4" /> Copy Code
            </Button>
          </TabsContent>

          <TabsContent value="javascript" className="space-y-4">
            <div>
              <Label htmlFor="js-code">JavaScript Embed Code</Label>
              <Textarea 
                id="js-code"
                className="font-mono text-sm mt-2" 
                rows={12} 
                value={getJavaScriptCode()} 
                readOnly 
              />
            </div>
            <Button onClick={() => copyToClipboard(getJavaScriptCode())}>
              <Copy className="mr-2 h-4 w-4" /> Copy Code
            </Button>
          </TabsContent>

          <TabsContent value="wordpress" className="space-y-4">
            <div>
              <Label htmlFor="wp-code">WordPress Shortcode</Label>
              <Textarea 
                id="wp-code"
                className="font-mono text-sm mt-2" 
                rows={3} 
                value={getWordPressCode()} 
                readOnly 
              />
            </div>
            <Button onClick={() => copyToClipboard(getWordPressCode())}>
              <Copy className="mr-2 h-4 w-4" /> Copy Code
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          <Code className="inline-block mr-2 h-4 w-4" />
          Need help with embedding? <a href="#" className="text-primary hover:underline">View our documentation</a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmbedCodeGenerator;
