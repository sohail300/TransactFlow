"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { transactionSchema } from "@/app/schema/transactionSchema";
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
];

export default function TransactionTable() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: undefined,
      amount: 0,
      description: "",
    },
  });

  async function getDetails() {
    try {
      setLoading(true);
      const response = await axios.get("/api/transactions");
      console.log(response.data.transactions);

      const transformedData = response.data.transactions.map((item) => ({
        id: item.id,
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

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post("/api/transactions", values);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 mt-16 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Submit Transactions
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-8 p-4 bg-white rounded-lg space-y-6 shadow-lg "
        >
          <div className=" flex justify-between">
            <FormField
              control={form.control}
              name="type"
              rules={{ required: "Transaction type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose the type of transaction you want to submit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message:
                    "Amount must be a valid number with up to 2 decimal places",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (INR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        const value = e.target.value;
                        if (value !== "") {
                          form.setValue(
                            "amount",
                            Number(parseFloat(value).toFixed(2))
                          );
                        }
                      }}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the transaction amount (up to 2 decimal places).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} cols={40} />
                  </FormControl>
                  <FormDescription>
                    Enter a brief description of the transaction.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-500 w-full"
          >
            Submit Transaction
          </Button>
        </form>
      </Form>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        View Transactions
      </h1>
      <div className="p-4 mt-4 bg-white rounded-lg shadow-lg overflow-x-auto">
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
