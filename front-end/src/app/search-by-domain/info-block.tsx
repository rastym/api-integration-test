"use client";

import { Card, CardContent } from "@/components/ui/card";

const DomainSearchInfo = () => {
  return (
    <Card className="bg-muted p-6 text-center">
      <CardContent className="space-y-2">
        <h2 className="text-xl font-semibold">Enter a Domain Name</h2>
        <p className="text-muted-foreground">
          Please enter a domain name in the search field and press the{" "}
          <span className="font-medium">Search</span> button to view related
          statistics.
        </p>
      </CardContent>
    </Card>
  );
};

export default DomainSearchInfo;
