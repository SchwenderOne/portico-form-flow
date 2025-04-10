
import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for booked slots
const mockBookings = [
  {
    id: "1",
    title: "Patient Consultation",
    date: "2024-04-11T10:00:00Z",
    duration: 30,
    status: "upcoming",
    attendee: "John Smith",
    email: "john.smith@example.com"
  },
  {
    id: "2",
    title: "Follow-up Meeting",
    date: "2024-04-11T14:30:00Z",
    duration: 45,
    status: "upcoming",
    attendee: "Sarah Johnson",
    email: "sarah.j@example.com"
  },
  {
    id: "3",
    title: "Intake Assessment",
    date: "2024-04-12T09:15:00Z",
    duration: 60,
    status: "upcoming",
    attendee: "Michael Brown",
    email: "mbrown@example.com"
  },
  {
    id: "4",
    title: "Project Review",
    date: "2024-04-09T11:00:00Z",
    duration: 30,
    status: "completed",
    attendee: "Emma Wilson",
    email: "e.wilson@example.com"
  },
  {
    id: "5",
    title: "Technical Support",
    date: "2024-04-08T15:45:00Z",
    duration: 20,
    status: "completed",
    attendee: "David Miller",
    email: "dmiller@example.com"
  }
];

// Mock data for available slots/booking types
const mockAvailableSlots = [
  {
    id: "slot1",
    title: "15-min Quick Consultation",
    description: "A brief meeting to discuss basic questions",
    duration: 15,
    availability: "Mon-Fri, 9AM-5PM"
  },
  {
    id: "slot2",
    title: "30-min Standard Meeting",
    description: "Standard consultation for most needs",
    duration: 30,
    availability: "Mon-Fri, 9AM-5PM"
  },
  {
    id: "slot3",
    title: "60-min Extended Session",
    description: "In-depth consultation for complex matters",
    duration: 60,
    availability: "Tue/Thu, 10AM-3PM"
  }
];

const SchedulerManager = () => {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [selectedMonth, setSelectedMonth] = useState("April 2024");
  
  const filteredBookings = mockBookings.filter(booking => 
    booking.status === currentTab
  );

  const handleCreateBookingSlot = () => {
    toast.success("Creating new booking slot type");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Meeting Scheduler</h2>
          <p className="text-muted-foreground">Manage your bookings and availability</p>
        </div>
        <Button onClick={handleCreateBookingSlot}>
          <Plus className="mr-2 h-4 w-4" />
          New Booking Type
        </Button>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setCurrentTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="April 2024">April 2024</SelectItem>
                <SelectItem value="May 2024">May 2024</SelectItem>
                <SelectItem value="June 2024">June 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="upcoming" className="mt-4">
          {filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookings.map(booking => (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{booking.title}</CardTitle>
                        <CardDescription>{booking.attendee}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.duration} minutes</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => toast.success(`Rescheduled ${booking.title}`)}>
                      Reschedule
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => toast.success(`Joined meeting with ${booking.attendee}`)}>
                      Join
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border rounded-md">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No upcoming bookings</h3>
              <p className="text-muted-foreground mb-4">You don't have any scheduled meetings for this period.</p>
              <Button onClick={() => toast.success("Viewing availability settings")}>
                Manage Availability
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {mockBookings.filter(b => b.status === "completed").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBookings.filter(b => b.status === "completed").map(booking => (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{booking.title}</CardTitle>
                        <CardDescription>{booking.attendee}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.duration} minutes</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success(`Sent follow up to ${booking.attendee}`)}>
                      Send Follow-up
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border rounded-md">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No completed bookings</h3>
              <p className="text-muted-foreground">There are no completed meetings in this period.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-4">
          <div className="text-center p-8 border rounded-md">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No cancelled bookings</h3>
            <p className="text-muted-foreground">There are no cancelled meetings in this period.</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Your Booking Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAvailableSlots.map(slot => (
            <Card key={slot.id}>
              <CardHeader>
                <CardTitle>{slot.title}</CardTitle>
                <CardDescription>{slot.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{slot.duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{slot.availability}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success(`Editing ${slot.title}`)}>
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulerManager;
