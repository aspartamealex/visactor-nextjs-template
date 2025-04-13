"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Quote } from "lucide-react";

interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  age: number;
  email: string;
  phone: string;
  imageUrl: string;
}

export default function Committees() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState<string>("");
  const [quoteLoading, setQuoteLoading] = useState(true);

  // Sample data for demonstration
  const sampleMembers: CommitteeMember[] = [
    {
      id: "1",
      name: "John Strata",
      role: "Chairperson",
      age: 45,
      email: "John@strata.com",
      phone: "0400 000 000",
      imageUrl: "/committee1.png",
    },
    {
      id: "2",
      name: "Carl Johnson",
      role: "Treasurer",
      age: 38,
      email: "cj@strata.com",
      phone: "0400 000 002",
      imageUrl: "/committee2.png",
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Secretary",
      age: 38,
      email: "michael.brown@strata.com",
      phone: "0400 000 003",
      imageUrl: "/committee3.png",
    },
    {
      id: "4",
      name: "Alex Li",
      role: "Member",
      age: 20,
      email: "aspartame@strata.com",
      phone: "0404 404 404",
      imageUrl: "/avatar.png",
    },
    {
      id: "5",
      name: "David Wilson",
      role: "Member",
      age: 29,
      email: "david.wilson@strata.com",
      phone: "0400 000 005",
      imageUrl: "/committee5.png",
    },
    {
      id: "6",
      name: "Lisa Anderson",
      role: "Member",
      age: 31,
      email: "lisa.anderson@strata.com",
      phone: "0400 000 006",
      imageUrl: "/committee6.png",
    },
    {
      id: "7",
      name: "Robert Taylor",
      role: "Member",
      age: 25,
      email: "robert.taylor@strata.com",
      phone: "0400 000 007",
      imageUrl: "/committee0.png",
    },
    {
      id: "8",
      name: "Jennifer White",
      role: "Internship",
      age: 19,
      email: "jennifer.white@strata.com",
      phone: "0400 000 008",
      imageUrl: "/committee0.png",
    },
  ];

  useEffect(() => {
    // For now, just use the sample data directly
    // When the API is ready, uncomment the fetch code
    setMembers(sampleMembers);
    setLoading(false);
    
    // Commented out until API is ready
  }, []);

  // Fetch a random quote from the edge function API
  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setQuote("Strata living is the fastest-growing form of property ownership in Australia.");
        setQuoteLoading(false);
      });
  }, []);

  // Use sample data if API data is not available
  const displayMembers = members.length > 0 ? members : sampleMembers;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Strata Committees</h1>
        <div className="text-sm text-gray-500">
          {displayMembers.length}/9 committees
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chairperson Card */}
          {displayMembers.find((member) => member.role === "Chairperson") && (
            <Card className="p-4 border-2 border-blue-500">
              <div className="flex items-center">
                <img
                  src={displayMembers.find((member) => member.role === "Chairperson")?.imageUrl}
                  alt="Chairperson"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-blue-500">Chairperson</h3>
                  <p className="font-semibold">
                    {displayMembers.find((member) => member.role === "Chairperson")?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Age: {displayMembers.find((member) => member.role === "Chairperson")?.age}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayMembers.find((member) => member.role === "Chairperson")?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayMembers.find((member) => member.role === "Chairperson")?.phone}
                  </p>
                  <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-sm py-1">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Treasurer Card */}
          {displayMembers.find((member) => member.role === "Treasurer") && (
            <Card className="p-4 border-2 border-green-500">
              <div className="flex items-center">
                <img
                  src={displayMembers.find((member) => member.role === "Treasurer")?.imageUrl}
                  alt="Treasurer"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-green-500">Treasurer</h3>
                  <p className="font-semibold">
                    {displayMembers.find((member) => member.role === "Treasurer")?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Age: {displayMembers.find((member) => member.role === "Treasurer")?.age}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayMembers.find((member) => member.role === "Treasurer")?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayMembers.find((member) => member.role === "Treasurer")?.phone}
                  </p>
                  <Button className="mt-2 bg-green-500 hover:bg-green-600 text-sm py-1">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Secretary Card */}
          {displayMembers.find((member) => member.role === "Secretary") && (
            <Card className="p-4 border-2 border-purple-500">
              <div className="flex items-center">
                <img
                  src={displayMembers.find((member) => member.role === "Secretary")?.imageUrl}
                  alt="Secretary"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-purple-500">Secretary</h3>
                  <p className="font-semibold">
                    {displayMembers.find((member) => member.role === "Secretary")?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Age: {displayMembers.find((member) => member.role === "Secretary")?.age}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayMembers.find((member) => member.role === "Secretary")?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayMembers.find((member) => member.role === "Secretary")?.phone}
                  </p>
                  <Button className="mt-2 bg-purple-500 hover:bg-purple-600 text-sm py-1">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Other Members */}
          {displayMembers
            .filter((member) => member.role === "Member")
            .map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-center">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Committee Member</h3>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-500">Age: {member.age}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                    <Button className="mt-2 text-sm py-1">Contact</Button>
                  </div>
                </div>
              </Card>
            ))}

                      {/* Internship Card */}
                      {displayMembers
            .filter((member) => member.role === "Internship")
            .map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-center">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold">Internship</h3>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-500">Age: {member.age}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                    <Button className="mt-2 text-sm py-1">Contact</Button>
                  </div>
                </div>
              </Card>
            ))}



          {/* Empty Slot for Election */}
          <Card className="p-4 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <Plus className="w-8 h-8 text-gray-400 mr-2" />
            <p className="text-lg font-semibold text-gray-500">Start Election</p>
          </Card>
        </div>
      )}

      {/* Random Quote Section */}
      <div className="mt-12 mb-6">
        <Card className="p-6 bg-gray-50">
          <div className="flex items-start">
            <Quote className="w-6 h-6 text-blue-500 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Did you know?</h3>
              {quoteLoading ? (
                <div className="animate-pulse h-6 bg-gray-200 rounded w-3/4"></div>
              ) : (
                <p className="text-gray-700 italic">{quote}</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 