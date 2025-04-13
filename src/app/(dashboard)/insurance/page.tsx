"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

// Sample data for insurance and levies
const insuranceData = [
  { id: 1, name: "John Smith", unit: "A-101", hasInsurance: false },
  { id: 2, name: "Sarah Johnson", unit: "A-211", hasInsurance: false },
  { id: 3, name: "Michael Brown", unit: "A-103", hasInsurance: false },
  { id: 4, name: "Emily Davis", unit: "A-110", hasInsurance: false },
  { id: 5, name: "David Wilson", unit: "B-101", hasInsurance: false },
  { id: 6, name: "Lisa Anderson", unit: "B-102", hasInsurance: false },
  { id: 7, name: "Robert Taylor", unit: "B-105", hasInsurance: false },
  { id: 8, name: "Jennifer White", unit: "B-203", hasInsurance: false },
  { id: 9, name: "Thomas Lee", unit: "C-101", hasInsurance: false },
  { id: 10, name: "Patricia Martinez", unit: "C-404", hasInsurance: false },
  { id: 11, name: "Robert Wilson", unit: "A-102", hasInsurance: false},
  { id: 12, name: "Lisa Taylor", unit: "C-205", hasInsurance: false},
];

const levyData = [
  { id: 1, name: "Emily Davis", unit: "A-104", amount: 1200, status: "Overdue", dueDate: "2025-04-30" },
  { id: 2, name: "Robert Taylor", unit: "B-103", amount: 1200, status: "Overdue", dueDate: "2025-04-30" },
  { id: 3, name: "James Wilson", unit: "C-103", amount: 1500, status: "Overdue", dueDate: "2025-04-30" },
  { id: 4, name: "Maria Garcia", unit: "C-101", amount: 1500, status: "Overdue", dueDate: "2025-04-30" },
  { id: 5, name: "David Thompson", unit: "C-202", amount: 1500, status: "Overdue", dueDate: "2025-04-30" },
  { id: 6, name: "Jennifer Brown", unit: "B-101", amount: 1200, status: "Overdue", dueDate: "2025-04-30" },
  { id: 7, name: "Michael Davis", unit: "B-210", amount: 1200, status: "Overdue", dueDate: "2025-04-30" },
  { id: 8, name: "Sarah Miller", unit: "A-101", amount: 1200, status: "Overdue", dueDate: "2025-04-30" },
  { id: 9, name: "Robert Wilson", unit: "A-102", amount: 1200, status: "Overdue", dueDate: "2025-04-30" },
  { id: 10, name: "Lisa Taylor", unit: "C-205", amount: 1500, status: "Overdue", dueDate: "2025-04-30" },
];

export default function InsuranceAndLevies() {
  const [insuranceOwners, setInsuranceOwners] = useState(insuranceData);
  const [levyOwners, setLevyOwners] = useState(levyData);

  // Fixed percentages as requested
  const insurancePercentage = 73; // 73% of owners have insurance
  const levyPercentage = 90; // 90% of owners have paid their levies
  
  // Calculate counts based on percentages
  const totalOwners = 325;
  const insuredCount = Math.round((insurancePercentage / 100) * totalOwners);
  const uninsuredCount = totalOwners - insuredCount;
  const paidCount = Math.round((levyPercentage / 100) * totalOwners);
  const unpaidCount = totalOwners - paidCount;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">April</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insurance Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Insurance Coverage</span>
              <span className="text-sm font-normal text-gray-500">
                {insuredCount}/{totalOwners} Owners Insured
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Insurance Coverage</span>
                <span className="text-sm font-medium">{insurancePercentage}%</span>
              </div>
              <Progress value={insurancePercentage} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Uninsured Owners</h3>
              <div className="space-y-2">
                {insuranceOwners
                  .filter(owner => !owner.hasInsurance)
                  .map(owner => (
                    <div key={owner.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{owner.name}</p>
                        <p className="text-sm text-gray-500">Unit {owner.unit}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-500 border-blue-500 hover:bg-blue-100"
                      >
                        Contact
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Levies Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Levy Payments</span>
              <span className="text-sm font-normal text-gray-500">
                {paidCount}/{totalOwners} Levies Paid
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Levy Collection Rate</span>
                <span className="text-sm font-medium">{levyPercentage}%</span>
              </div>
              <Progress value={levyPercentage} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Unpaid Owners</h3>
              <div className="space-y-2">
                {levyOwners.map(owner => (
                  <div key={owner.id} className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                    <div>
                      <p className="font-medium">{owner.name}</p>
                      <p className="text-sm text-gray-500">Unit {owner.unit}</p>
                      <p className="text-xs text-red-500">Due on {owner.dueDate}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">${owner.amount}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 border-red-500 hover:bg-red-100"
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 