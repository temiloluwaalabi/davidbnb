import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FilterModal = () => {
  return (
    <Card className=" border-none shadow-none">
      <CardHeader className="shadow-none border-b border-b-secondary-text">
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="relative overflow-y-auto custom-scrollbar"></CardContent>
    </Card>
  );
};

export default FilterModal;
