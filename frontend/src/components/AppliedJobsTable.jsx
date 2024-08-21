import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobsTable = () => {
  return (
    <div>
      <Table className="mt-5 ">
        <TableCaption>Your Applied Jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow className=" my-2" key={index}>
              <TableCell>12 Aug 2024 </TableCell>
              <TableCell>Full Stack Developer </TableCell>
              <TableCell> Microsoft </TableCell>
              <TableCell>
                <Badge
                  className={"bg-purple-700 hover:bg-purple-800 cursor-default"}
                >
                  Selected
                </Badge>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
