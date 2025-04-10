
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Plus, Clock, User, CalendarDays, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

// Mock data for scheduled appointments
const mockAppointments = [
  { 
    id: 1, 
    name: "Initial Consultation", 
    date: "2024-04-15", 
    time: "09:00 - 10:00", 
    attendees: 1,
    bookedBy: "john.doe@example.com",
    status: "upcoming" 
  },
  { 
    id: 2, 
    name: "Project Review", 
    date: "2024-04-16", 
    time: "14:00 - 15:30", 
    attendees: 3,
    bookedBy: "team@example.org",
    status: "upcoming" 
  },
  { 
    id: 3, 
    name: "Feedback Session", 
    date: "2024-04-10", 
    time: "10:30 - 11:00", 
    attendees: 2,
    bookedBy: "sarah.smith@example.com",
    status: "completed" 
  },
  { 
    id: 4, 
    name: "Strategy Meeting", 
    date: "2024-04-08", 
    time: "16:00 - 17:00", 
    attendees: 4,
    bookedBy: "project.lead@example.com",
    status: "cancelled" 
  },
];

// Mock data for available slots
const mockTimeSlots = [
  { id: 1, day: "Monday", startTime: "09:00", endTime: "17:00", available: true },
  { id: 2, day: "Tuesday", startTime: "09:00", endTime: "17:00", available: true },
  { id: 3, day: "Wednesday", startTime: "09:00", endTime: "17:00", available: true },
  { id: 4, day: "Thursday", startTime: "09:00", endTime: "17:00", available: true },
  { id: 5, day: "Friday", startTime: "09:00", endTime: "17:00", available: true },
  { id: 6, day: "Saturday", startTime: "10:00", endTime: "14:00", available: false },
  { id: 7, day: "Sunday", startTime: "10:00", endTime: "14:00", available: false },
];

interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  attendees: number;
  bookedBy: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface TimeSlot {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

const SchedulerManager = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isSlotDialogOpen, setIsSlotDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSlotAvailability = (slot: TimeSlot) => {
    setTimeSlots(timeSlots.map(s => 
      s.id === slot.id ? { ...s, available: !s.available } : s
    ));
    
    toast.success(`${slot.day} ${slot.available ? "blocked" : "made available"}`);
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsSlotDialogOpen(true);
  };

  const handleSaveSlot = () => {
    if (!selectedSlot) return;
    
    setTimeSlots(timeSlots.map(s => 
      s.id === selectedSlot.id ? selectedSlot : s
    ));
    
    setIsSlotDialogOpen(false);
    toast.success("Time slot updated successfully");
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: "cancelled" } : app
    ));
    
    toast.success("Appointment cancelled successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default" className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="text-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">
            <CalendarClock className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Clock className="h-4 w-4 mr-2" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-medium">Your Scheduled Appointments</h4>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Appointments</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {appointments.length > 0 ? (
              <Table>
                <TableCaption>Your scheduled appointments</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appointment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Booked By</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.name}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.bookedBy}</TableCell>
                      <TableCell className="text-center">{appointment.attendees}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {appointment.status === "upcoming" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 border rounded-md bg-muted/20">
                <CalendarClock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No appointments scheduled</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any appointments scheduled yet
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="availability" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-medium">Your Availability</h4>
              <Button onClick={() => {
                setSelectedSlot({
                  id: Math.max(0, ...timeSlots.map(s => s.id)) + 1,
                  day: "Monday",
                  startTime: "09:00",
                  endTime: "17:00",
                  available: true
                });
                setIsSlotDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </div>
            
            <Table>
              <TableCaption>Configure your availability for appointments</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">{slot.day}</TableCell>
                    <TableCell>{slot.startTime}</TableCell>
                    <TableCell>{slot.endTime}</TableCell>
                    <TableCell>
                      <Badge variant={slot.available ? "default" : "secondary"} className={slot.available ? "bg-green-500" : ""}>
                        {slot.available ? "Available" : "Blocked"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditSlot(slot)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={slot.available ? "destructive" : "default"}
                          size="sm"
                          onClick={() => handleSlotAvailability(slot)}
                        >
                          {slot.available ? "Block" : "Make Available"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Edit time slot dialog */}
          <Dialog open={isSlotDialogOpen} onOpenChange={setIsSlotDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedSlot && selectedSlot.id > timeSlots.length ? "Add Time Slot" : "Edit Time Slot"}
                </DialogTitle>
                <DialogDescription>
                  Configure the time slot for scheduling appointments
                </DialogDescription>
              </DialogHeader>
              
              {selectedSlot && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="day">Day of Week</Label>
                    <Select 
                      value={selectedSlot.day}
                      onValueChange={(value) => setSelectedSlot({...selectedSlot, day: value})}
                    >
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                        <SelectItem value="Saturday">Saturday</SelectItem>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input 
                        id="start-time" 
                        type="time"
                        value={selectedSlot.startTime}
                        onChange={(e) => setSelectedSlot({...selectedSlot, startTime: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input 
                        id="end-time" 
                        type="time"
                        value={selectedSlot.endTime}
                        onChange={(e) => setSelectedSlot({...selectedSlot, endTime: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="available"
                      checked={selectedSlot.available}
                      onChange={(e) => setSelectedSlot({...selectedSlot, available: e.target.checked})}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="available" className="text-sm font-normal">
                      Available for booking
                    </Label>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSlotDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSlot}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-base font-medium mb-4">Calendar View</h4>
              <div className="border rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-medium mb-4">
                {date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : "Select a date"}
              </h4>
              
              <div className="border rounded-md p-4 h-full flex flex-col">
                {date ? (
                  <div className="space-y-4 flex-1">
                    <p className="text-sm text-muted-foreground">
                      Appointments for the selected date will appear here.
                    </p>
                    
                    <div className="flex items-center justify-center flex-1">
                      <div className="text-center">
                        <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          No appointments scheduled for this date
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Please select a date to view appointments
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulerManager;
