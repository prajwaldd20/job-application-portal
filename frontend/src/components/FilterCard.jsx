import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Pune", "Delhi", "Bangalore", "Hyderabad", "Nagpur", "Mumbai"],
  },
  {
    filterType: "Domain",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "AI/ML Developer",
      "UI/UX Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0 - 40k", "40k - 1 lakh", "1 lakh - 4 lakh", "Above 4 lakh"],
  },
];
const FilterCard = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold bg-slate-200 p-2 rounded-lg max-w-max">
        Filter Jobs
      </h1>
      <hr className="mt-3" />
      <RadioGroup className="my-2 border border-gray-300 p-2 rounded-xl ">
        {filterData.map((data, index) => (
          <div className="my-2">
            <h1 className="text-green-900 font-semibold mb-1">
              {data.filterType}
            </h1>
            {data.array.map((item, index) => {
              return (
                <div className="my-1" key={index}>
                  <RadioGroupItem className="text-red-600" value={item} />
                  <Label className="mx-2">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
