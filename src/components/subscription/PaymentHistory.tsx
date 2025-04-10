
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileCheck, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: "successful" | "failed" | "pending";
  plan: string;
  invoiceUrl?: string;
}

export const PaymentHistory = () => {
  // Mock data - would be fetched from your API
  const payments: Payment[] = [
    {
      id: "INV-001",
      date: "2023-04-10",
      amount: 29.00,
      status: "successful",
      plan: "Pro Plan",
      invoiceUrl: "#"
    },
    {
      id: "INV-002",
      date: "2023-03-10",
      amount: 29.00,
      status: "successful",
      plan: "Pro Plan",
      invoiceUrl: "#"
    },
    {
      id: "INV-003",
      date: "2023-02-10",
      amount: 29.00,
      status: "successful",
      plan: "Pro Plan",
      invoiceUrl: "#"
    },
    {
      id: "INV-004",
      date: "2023-01-10",
      amount: 19.00,
      status: "failed",
      plan: "Basic Plan"
    }
  ];

  // If you're using the Free plan or have no payment history
  const hasPayments = payments.length > 0;

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "successful":
        return <Badge variant="success">Successful</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!hasPayments) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <FileX className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">No Payment History</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            You're currently on the Free plan or haven't made any payments yet. Upgrade to a paid plan to see your payment history here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent payments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{formatDate(payment.date)}</TableCell>
              <TableCell>{payment.plan}</TableCell>
              <TableCell>{formatCurrency(payment.amount)}</TableCell>
              <TableCell>{getStatusBadge(payment.status)}</TableCell>
              <TableCell className="text-right">
                {payment.status === "successful" && payment.invoiceUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download Invoice</span>
                    </a>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
