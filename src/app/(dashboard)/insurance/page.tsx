"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data for insurance and levies
const insuranceData = [
  { id: 1, type: "Building Insurance", provider: "ABC Insurance", policyNumber: "POL-2023-001", startDate: "2023-01-01", endDate: "2023-12-31", premium: 5000, status: "Active" },
  { id: 2, type: "Public Liability", provider: "XYZ Insurance", policyNumber: "POL-2023-002", startDate: "2023-01-01", endDate: "2023-12-31", premium: 2500, status: "Active" },
  { id: 3, type: "Workers Compensation", provider: "ABC Insurance", policyNumber: "POL-2023-003", startDate: "2023-01-01", endDate: "2023-12-31", premium: 1500, status: "Active" },
];

const leviesData = [
  { id: 1, period: "Q1 2023", dueDate: "2023-03-31", amount: 15000, status: "Paid", paymentDate: "2023-03-15" },
  { id: 2, period: "Q2 2023", dueDate: "2023-06-30", amount: 15000, status: "Paid", paymentDate: "2023-06-20" },
  { id: 3, period: "Q3 2023", dueDate: "2023-09-30", amount: 15000, status: "Paid", paymentDate: "2023-09-25" },
  { id: 4, period: "Q4 2023", dueDate: "2023-12-31", amount: 15000, status: "Pending", paymentDate: null },
  { id: 5, period: "Q1 2024", dueDate: "2024-03-31", amount: 16000, status: "Upcoming", paymentDate: null },
];

export default function InsuranceAndLevies() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Insurance & Levies</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Insurance Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,000</div>
            <p className="text-xs text-muted-foreground">Annual cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">All policies current</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Levies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$61,000</div>
            <p className="text-xs text-muted-foreground">Annual budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Levy Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">All levies paid on time</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Insurance Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Policy Number</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insuranceData.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.type}</TableCell>
                    <TableCell>{policy.provider}</TableCell>
                    <TableCell>{policy.policyNumber}</TableCell>
                    <TableCell>${policy.premium.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {policy.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Levy Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leviesData.map((levy) => (
                  <TableRow key={levy.id}>
                    <TableCell className="font-medium">{levy.period}</TableCell>
                    <TableCell>{levy.dueDate}</TableCell>
                    <TableCell>${levy.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        levy.status === "Paid" ? "bg-green-100 text-green-800" : 
                        levy.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {levy.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 