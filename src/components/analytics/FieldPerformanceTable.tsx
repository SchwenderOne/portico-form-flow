
import React, { useState } from "react";
import { FieldStatistics } from "@/types/analytics";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, XCircle, Clock, CheckCircle } from "lucide-react";
import { formatDistanceStrict } from "date-fns";

interface FieldPerformanceTableProps {
  fields: FieldStatistics[];
}

type SortKey = 'fieldLabel' | 'abandonmentRate' | 'averageTimeSpentSeconds' | 'completionRate';
type SortDirection = 'asc' | 'desc';

const FieldPerformanceTable: React.FC<FieldPerformanceTableProps> = ({ fields }) => {
  const [sortKey, setSortKey] = useState<SortKey>('abandonmentRate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedFields = [...fields].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return sortDirection === 'asc' 
      ? (valueA as number) - (valueB as number) 
      : (valueB as number) - (valueA as number);
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Field Performance</CardTitle>
        <CardDescription>
          Detailed metrics for each field in your form
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('fieldLabel')}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Field
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('abandonmentRate')}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  <XCircle className="h-3 w-3 mr-1 text-red-500" />
                  Abandonment Rate
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('averageTimeSpentSeconds')}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  <Clock className="h-3 w-3 mr-1 text-blue-500" />
                  Average Time
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('completionRate')}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  Completion Rate
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFields.map((field) => (
              <TableRow key={field.fieldId}>
                <TableCell className="font-medium">
                  {field.fieldLabel}
                  <span className="text-xs text-muted-foreground block">
                    {field.fieldType}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={field.abandonmentRate > 0.3 ? "text-red-500 font-medium" : ""}>
                    {(field.abandonmentRate * 100).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell>
                  {formatDistanceStrict(0, field.averageTimeSpentSeconds * 1000)}
                </TableCell>
                <TableCell>
                  <span className={field.completionRate > 0.7 ? "text-green-500 font-medium" : ""}>
                    {(field.completionRate * 100).toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FieldPerformanceTable;
