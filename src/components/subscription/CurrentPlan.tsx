
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar, CreditCard, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const CurrentPlan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Mock data - would be fetched from your API
  const currentPlan = {
    name: "Free Plan",
    status: "active",
    renewalDate: null,
    paymentMethod: null,
    price: 0,
    interval: null,
    usage: {
      forms: {
        used: 2,
        limit: 3
      },
      responses: {
        used: 15,
        limit: 30
      }
    }
  };

  const handleUpdatePaymentMethod = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For a real implementation, you would use Stripe customer portal:
      // const { data, error } = await supabase.functions.invoke('create-customer-portal', {});
      // if (error) throw error;
      // window.location.href = data.url;
      
      toast.success("Redirecting to payment management portal...");
      // Mock redirect for demo purposes
      setTimeout(() => {
        toast.info("This is a demo. In a real app, you would be redirected to Stripe.");
      }, 1500);
    } catch (error) {
      console.error("Error updating payment method:", error);
      toast.error("Failed to update payment method");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For a real implementation, you would call an edge function:
      // const { error } = await supabase.functions.invoke('cancel-subscription', {});
      // if (error) throw error;
      
      toast.success("Subscription canceled successfully");
      setShowCancelDialog(false);
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("Failed to cancel subscription");
    } finally {
      setIsLoading(false);
    }
  };

  const isPaidPlan = currentPlan.price > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Details about your current subscription plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
              <p className="text-lg font-medium">{currentPlan.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="text-lg font-medium capitalize">{currentPlan.status}</p>
            </div>
            {isPaidPlan && currentPlan.renewalDate && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Next Renewal</h3>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-lg font-medium">{currentPlan.renewalDate}</p>
                </div>
              </div>
            )}
            {isPaidPlan && currentPlan.paymentMethod && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-lg font-medium">{currentPlan.paymentMethod}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Usage</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Forms</span>
                  <span>{currentPlan.usage.forms.used} of {currentPlan.usage.forms.limit}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(currentPlan.usage.forms.used / currentPlan.usage.forms.limit) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Responses</span>
                  <span>{currentPlan.usage.responses.used} of {currentPlan.usage.responses.limit}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(currentPlan.usage.responses.used / currentPlan.usage.responses.limit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleUpdatePaymentMethod} 
            variant="outline" 
            disabled={isLoading || !isPaidPlan}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </>
            )}
          </Button>
          
          {isPaidPlan && (
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading}>
                  Cancel Subscription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Subscription</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.
                  </DialogDescription>
                </DialogHeader>
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone. You will need to subscribe again to regain access to premium features.
                  </AlertDescription>
                </Alert>
                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isLoading}>
                    Keep Subscription
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleCancelSubscription}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Canceling...
                      </>
                    ) : (
                      "Yes, Cancel"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>

      {!isPaidPlan && (
        <Alert className="mt-6">
          <AlertTitle>You're on the Free Plan</AlertTitle>
          <AlertDescription>
            Upgrade to a paid plan to unlock additional features and increase your usage limits.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
