
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Download, Printer, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDisplayProps {
  formUrl: string;
  brandColor: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ formUrl, brandColor }) => {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(200);
  const [qrColor, setQrColor] = useState(brandColor);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  
  // Generate QR code when URL or color changes
  useEffect(() => {
    generateQRCode();
  }, [formUrl, qrColor, size]);
  
  // This is a simplified QR code generator
  // In a real app, you would use a library like qrcode.js
  const generateQRCode = async () => {
    if (!formUrl) return;
    
    setIsGenerating(true);
    
    try {
      // Simulate API call to generate QR code
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Create a data URL that looks like a QR code (simplified version)
      // In production, use a proper QR code generation library
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        // Draw a simple QR code pattern
        ctx.fillStyle = qrColor;
        
        // Draw position detection patterns (corners)
        const blockSize = size / 25;
        
        // Top-left position pattern
        for (let y = 0; y < 7; y++) {
          for (let x = 0; x < 7; x++) {
            if ((x === 0 || x === 6 || y === 0 || y === 6) || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) {
              ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
          }
        }
        
        // Top-right position pattern
        for (let y = 0; y < 7; y++) {
          for (let x = 0; x < 7; x++) {
            if ((x === 0 || x === 6 || y === 0 || y === 6) || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) {
              ctx.fillRect((size - 7 * blockSize) + x * blockSize, y * blockSize, blockSize, blockSize);
            }
          }
        }
        
        // Bottom-left position pattern
        for (let y = 0; y < 7; y++) {
          for (let x = 0; x < 7; x++) {
            if ((x === 0 || x === 6 || y === 0 || y === 6) || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) {
              ctx.fillRect(x * blockSize, (size - 7 * blockSize) + y * blockSize, blockSize, blockSize);
            }
          }
        }
        
        // Draw random data modules to simulate QR code
        for (let i = 0; i < 200; i++) {
          const x = Math.floor(Math.random() * 20) + 2;
          const y = Math.floor(Math.random() * 20) + 2;
          ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        }
        
        setQrCodeDataUrl(canvas.toDataURL('image/png'));
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
        title: "Failed to generate QR code",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const downloadQRCode = () => {
    if (!qrCodeDataUrl) {
      toast({
        title: "QR Code not ready",
        description: "Please wait for the QR code to generate",
        variant: "destructive",
      });
      return;
    }
    
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `portico-form-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been downloaded successfully.",
    });
  };

  const printQRCode = () => {
    if (!qrCodeDataUrl) {
      toast({
        description: "QR code is still generating. Please wait.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      description: "Preparing QR code for printing...",
    });
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 80%; }
            </style>
          </head>
          <body>
            <img src="${qrCodeDataUrl}" alt="QR Code for ${formUrl}" />
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to print the QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code</CardTitle>
        <CardDescription>
          Generate a QR code that links directly to your form
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div 
            ref={qrCodeRef} 
            className="flex items-center justify-center border rounded-md p-4 min-w-[200px] min-h-[200px]"
            style={{ width: size, height: size }}
          >
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p className="text-sm">Generating QR Code...</p>
              </div>
            ) : qrCodeDataUrl ? (
              <img 
                src={qrCodeDataUrl} 
                alt={`QR Code for ${formUrl}`} 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                <p>Enter a valid URL to generate QR code</p>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="qr-size">QR Code Size</Label>
              <Slider
                id="qr-size"
                min={100}
                max={400}
                step={10}
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            <div>
              <Label htmlFor="qr-color">QR Code Color</Label>
              <div className="flex mt-2 gap-2">
                <Input
                  id="qr-color"
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-10 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="flex-1"
                  maxLength={7}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="qr-url">QR Code URL</Label>
              <Input
                id="qr-url"
                value={formUrl}
                readOnly
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button 
          onClick={downloadQRCode} 
          disabled={isGenerating || !qrCodeDataUrl}
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button 
          variant="outline" 
          onClick={printQRCode}
          disabled={isGenerating || !qrCodeDataUrl}
        >
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeDisplay;
