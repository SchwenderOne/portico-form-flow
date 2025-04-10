
import React from "react";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Documentation = () => {
  const sections = [
    {
      title: "Form Builder",
      items: [
        { title: "Drag & Drop Elements", url: "#" },
        { title: "Form Properties", url: "#" },
        { title: "Field Validation", url: "#" },
        { title: "Conditional Logic", url: "#" },
      ],
    },
    {
      title: "Distribution",
      items: [
        { title: "Email Campaigns", url: "#" },
        { title: "Embed Forms", url: "#" },
        { title: "QR Codes", url: "#" },
        { title: "Direct Links", url: "#" },
      ],
    },
    {
      title: "Branding",
      items: [
        { title: "Brand Kits", url: "#" },
        { title: "Typography", url: "#" },
        { title: "Colors", url: "#" },
        { title: "Logo Integration", url: "#" },
      ],
    },
    {
      title: "Compliance",
      items: [
        { title: "GDPR Compliance", url: "#" },
        { title: "Data Encryption", url: "#" },
        { title: "Accessibility", url: "#" },
        { title: "Audit Logs", url: "#" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Documentation</h2>
        <Button variant="outline" size="sm" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <span>Full Documentation</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {sections.map((section, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium">{section.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 mt-2">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.url}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline flex items-center gap-1"
                    >
                      {item.title}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Need more help?</h3>
        <p className="text-sm text-muted-foreground">
          Can't find what you're looking for? Check our FAQ section or contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};
