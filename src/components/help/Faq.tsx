
import React from "react";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Faq = () => {
  const faqs = [
    {
      question: "How do I create my first form?",
      answer:
        "To create your first form, navigate to the Templates page, choose a template or start from scratch. You can then customize it in the Form Builder by adding fields, changing the layout, and adjusting the design."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also offer invoicing with net-30 payment terms."
    },
    {
      question: "How do I export form responses?",
      answer:
        "You can export form responses by navigating to your form's Analytics section and clicking on the 'Export' button. You can choose to export as CSV, Excel, or PDF format."
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, Portico takes data security seriously. We use AES-256 encryption for all stored data, implement strict access controls, and comply with GDPR and other privacy regulations. Our infrastructure is hosted on secure cloud providers with SOC 2 compliance."
    },
    {
      question: "Can I white-label my forms?",
      answer:
        "Yes, with our Pro and Enterprise plans, you can white-label your forms with your own branding, remove Portico branding, and even use your own domain for form distribution."
    },
    {
      question: "How do I set up conditional logic in my forms?",
      answer:
        "In the Form Builder, select a field and open the Properties panel. There, you'll find a 'Conditional Logic' section where you can set conditions based on other field values to show or hide the selected field."
    },
    {
      question: "What's the difference between the Pro and Enterprise plans?",
      answer:
        "The Enterprise plan includes advanced features like unlimited responses, dedicated support, advanced analytics, AI form generation, and custom compliance certifications that aren't available in the Pro plan."
    },
    {
      question: "Can I integrate with other tools?",
      answer:
        "Yes, Portico integrates with many popular tools including CRM systems, email marketing platforms, and analytics services. You can find these in the Integrations section of your account settings."
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search frequently asked questions..."
          className="pl-9 w-full"
        />
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
            <AccordionTrigger className="text-base font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground pt-2">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-muted/50 p-4 rounded-lg text-center">
        <h3 className="font-medium mb-2">Still have questions?</h3>
        <p className="text-sm text-muted-foreground">
          If you can't find an answer to your question, please contact our support team.
        </p>
      </div>
    </div>
  );
};
