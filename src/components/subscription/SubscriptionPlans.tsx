
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2, Building2, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  badge?: string;
  icon?: React.ReactNode;
}

export const SubscriptionPlans = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      interval: "",
      description: "Basic features for individuals and small teams",
      features: [
        { name: "3 forms", included: true },
        { name: "10 responses per form", included: true },
        { name: "Basic templates", included: true },
        { name: "Email support", included: true },
        { name: "Advanced branding", included: false },
        { name: "Custom domains", included: false },
        { name: "AI form generation", included: false },
        { name: "Advanced analytics", included: false },
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: 29,
      interval: "month",
      description: "Everything in Free, plus essential features for professionals",
      features: [
        { name: "Unlimited forms", included: true },
        { name: "1,000 responses per form", included: true },
        { name: "All templates", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced branding", included: true },
        { name: "Custom domains", included: true },
        { name: "AI form generation", included: false },
        { name: "Advanced analytics", included: false },
      ],
      highlight: true,
      badge: "Most Popular"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 79,
      interval: "month",
      description: "Advanced features for larger organizations with complex needs",
      features: [
        { name: "Unlimited forms", included: true },
        { name: "Unlimited responses", included: true },
        { name: "All templates", included: true },
        { name: "24/7 phone support", included: true },
        { name: "Advanced branding", included: true },
        { name: "Custom domains", included: true },
        { name: "AI form generation", included: true },
        { name: "Advanced analytics", included: true },
      ]
    },
    {
      id: "government",
      name: "Government",
      price: 49,
      interval: "month",
      description: "Compliant features for government agencies and public sector",
      features: [
        { name: "Unlimited forms", included: true },
        { name: "5,000 responses per form", included: true },
        { name: "Government templates", included: true },
        { name: "Dedicated support", included: true },
        { name: "Advanced branding", included: true },
        { name: "Custom domains", included: true },
        { name: "AI form generation", included: true },
        { name: "Compliance certifications", included: true },
      ],
      badge: "GDPR Compliant",
      icon: <Shield className="h-4 w-4 text-primary absolute top-4 left-4" />
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error("Please sign in to subscribe to a plan");
      return;
    }

    setIsLoading(planId);
    
    try {
      // Simulate API call to create checkout session
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For a real implementation, you would use Supabase Edge Function:
      // const { data, error } = await supabase.functions.invoke('create-checkout', {
      //   body: { planId }
      // });
      // if (error) throw new Error(error.message);
      // window.location.href = data.url;

      if (planId === "free") {
        toast.success("You are now on the Free plan!");
      } else {
        toast.success("Redirecting to checkout...");
        // Mock redirect for demo purposes
        setTimeout(() => {
          toast.info("This is a demo. In a real app, you would be redirected to Stripe.");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to process subscription request");
    } finally {
      setIsLoading(null);
    }
  };

  const getCurrentPlanId = () => {
    // This would typically come from your auth context or API
    return "free";
  };

  const currentPlanId = getCurrentPlanId();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative ${plan.highlight ? 'border-primary shadow-md' : ''}`}
        >
          {plan.badge && (
            <Badge 
              className="absolute top-4 right-4" 
              variant="default"
            >
              {plan.badge}
            </Badge>
          )}
          {plan.icon}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">${plan.price}</span>
              {plan.interval && (
                <span className="ml-1 text-sm text-muted-foreground">/{plan.interval}</span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.included ? (
                    <Check className="h-4 w-4 mr-2 text-primary" />
                  ) : (
                    <div className="h-4 w-4 mr-2 rounded-full bg-muted" />
                  )}
                  <span className={feature.included ? "" : "text-muted-foreground"}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant={plan.id === currentPlanId ? "outline" : (plan.highlight ? "default" : "outline")}
              disabled={isLoading !== null || plan.id === currentPlanId}
              onClick={() => handleSubscribe(plan.id)}
            >
              {isLoading === plan.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : plan.id === currentPlanId ? (
                "Current Plan"
              ) : (
                `Subscribe to ${plan.name}`
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
