"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Loader from "@/components/Loader";
import axios from "axios";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
};

const columnHelper = createColumnHelper<Transaction>();

export default function TransactionTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    columnHelper.accessor("type", {
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      header: () => <span>Type</span>,
    }),
    columnHelper.accessor("amount", {
      cell: (info) => (
        <span className="font-medium">₹{info.getValue().toFixed(2)}</span>
      ),
      header: () => <span>Amount</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-sm text-xs font-semibold
          ${
            info.getValue() === "Approved"
              ? "bg-green-100 text-green-800"
              : info.getValue() === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : info.getValue() === "Rejected"
              ? "bg-red-100 text-red-800"
              : "bg-inherit text-gray-800"
          }`}
        >
          {info.getValue()}
        </span>
      ),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("description", {
      cell: (info) => (
        <span className="text-sm text-gray-600">{info.getValue()}</span>
      ),
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        const status = info.row.original.status;
        return status === "Pending" ? (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handleApprove(info.row.original.id)}
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => handleReject(info.row.original.id)}
            >
              Reject
            </Button>
          </div>
        ) : (
          ""
        );
      },
      header: () => <span>Action</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleApprove(id: string) {
    try {
      setLoading(true);
      await axios.put(`/api/transactions/${id}/approve`);
      getDetails();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReject(id: string) {
    try {
      setLoading(true);
      await axios.put(`/api/transactions/${id}/reject`);
      getDetails();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getDetails() {
    try {
      setLoading(true);
      const response = await axios.get("/api/transactions");
      console.log(response.data.transactions);

      const transformedData = response.data.transactions.map((item) => ({
        id: item._id,
        type: item.type,
        amount: Number(item.amount) / 100,
        status: item.status,
        description: item.description || "",
      }));

      console.log("Transformed data:", transformedData);
      setData(transformedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 min-h-screen mt-16">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        View Transactions
      </h1>
      <div className="p-4 mx-4 mt-8 bg-white rounded-lg shadow-lg overflow-x-auto">
        <Table className="w-full min-w-[600px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-blue-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-blue-800 font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-blue-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
