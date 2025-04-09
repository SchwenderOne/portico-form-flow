
import React from "react";
import { Button } from "@/components/ui/button";
import {
  GitBranchPlus, 
  ArrowRight, 
  PlusCircle, 
  Eye, 
  EyeOff,
  Settings,
  Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";

const LogicTab = () => {
  const { elements } = useFormCanvas();
  const [rules, setRules] = React.useState([
    { id: 1, name: "Show address fields when shipping is selected" },
    { id: 2, name: "Required fields for business customers" }
  ]);
  
  const handleAddRule = () => {
    const newRule = {
      id: rules.length + 1,
      name: `New Rule ${rules.length + 1}`
    };
    
    setRules([...rules, newRule]);
    toast.success("New conditional logic rule added");
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm space-y-1">
        <h3 className="font-medium">Form Logic</h3>
        <p className="text-xs text-muted-foreground">
          Create conditional logic to show/hide fields based on user input
        </p>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full gap-1"
        onClick={handleAddRule}
      >
        <GitBranchPlus className="h-4 w-4" />
        Add Conditional Logic
      </Button>
      
      <ScrollArea className="h-[calc(100vh-260px)]">
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="rounded-md border p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium">{rule.name}</h4>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Settings className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3 bg-gray-50 rounded-md p-2">
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-muted-foreground">IF</p>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {elements.map(element => (
                          <SelectItem key={element.id} value={element.id}>
                            {element.label || element.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger className="h-7 text-xs w-24">
                        <SelectValue placeholder="is" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">equals</SelectItem>
                        <SelectItem value="not-equals">not equals</SelectItem>
                        <SelectItem value="contains">contains</SelectItem>
                        <SelectItem value="starts-with">starts with</SelectItem>
                        <SelectItem value="ends-with">ends with</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input className="h-7 text-xs" placeholder="Value" />
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-muted-foreground">THEN</p>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="h-7 text-xs w-24">
                        <SelectValue placeholder="Show" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="show">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>Show</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="hide">
                          <div className="flex items-center gap-1">
                            <EyeOff className="h-3 w-3" />
                            <span>Hide</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger className="h-7 text-xs flex-1">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {elements.map(element => (
                          <SelectItem key={element.id} value={element.id}>
                            {element.label || element.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 text-xs h-7"
              >
                <PlusCircle className="h-3 w-3 mr-1" />
                Add Another Condition
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LogicTab;
