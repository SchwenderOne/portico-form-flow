
import React from "react";
import { Automation } from "@/types/automation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Pencil, Trash2, Zap } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface AutomationsListProps {
  automations: Automation[];
  onEdit: (automation: Automation) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

const AutomationsList: React.FC<AutomationsListProps> = ({ 
  automations, 
  onEdit,
  onDelete,
  onToggle
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Automations</CardTitle>
        <div className="text-sm text-muted-foreground">
          {automations.length} automation{automations.length !== 1 ? 's' : ''}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Trigger</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {automations.map((automation) => (
              <TableRow key={automation.id}>
                <TableCell className="font-medium">{automation.name}</TableCell>
                <TableCell>{automation.trigger.name}</TableCell>
                <TableCell>{automation.actions.length} action{automation.actions.length !== 1 ? 's' : ''}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={automation.enabled} 
                      onCheckedChange={(checked) => onToggle(automation.id, checked)}
                    />
                    <Badge variant={automation.enabled ? "default" : "outline"}>
                      {automation.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(automation)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(automation.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AutomationsList;
