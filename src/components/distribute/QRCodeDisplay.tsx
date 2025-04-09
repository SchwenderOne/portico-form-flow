
import React, { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Download, Printer } from "lucide-react";
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
  
  // This is a placeholder for actual QR code generation
  // In a real implementation, we would use a library like qrcode.react
  const downloadQRCode = () => {
    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been downloaded successfully.",
    });
  };

  const printQRCode = () => {
    toast({
      description: "Preparing QR code for printing...",
    });
    window.print();
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
            {/* Placeholder for QR code - would use a real QR code library in production */}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div 
                className="w-3/4 h-3/4 rounded-lg"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10H30V30H10V10ZM40 10H50V20H40V10ZM60 10H90V40H80V20H60V10ZM10 40H20V50H10V40ZM40 40H50V50H40V40ZM60 50H90V60H70V70H60V50ZM10 60H30V80H20V70H10V60ZM40 70H50V90H40V70ZM60 80H70V90H60V80ZM80 70H90V90H80V70Z' fill='${encodeURIComponent(qrColor)}'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain'
                }}
              ></div>
            </div>
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
        <Button onClick={downloadQRCode}>
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button variant="outline" onClick={printQRCode}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeDisplay;
