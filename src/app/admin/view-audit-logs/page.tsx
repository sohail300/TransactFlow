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
import { Download } from "lucide-react";
import Loader from "@/components/Loader";
import axios from "axios";

const AuditLogsPage = () => {
  const [loading, setLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const downloadCSV = () => {
    const headers = ["ID", "Action", "Timestamp", "User", "Details"];
    const csvContent = [
      headers.join(","),
      ...auditLogs.map((log) =>
        [log.id, log.action, log.timestamp, log.user, log.manager].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "audit_logs.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  async function getDetails() {
    try {
      setLoading(true);
      const response = await axios.get("/api/audit-log");
      console.log(response.data.logs);

      const transformedData = response.data.logs.map((item) => ({
        id: item._id,
        transactionId: item.transactionId,
        action: item.action,
        user: item.userId.email || "",
        manager: item.managerId?.email || "",
        timestamp: item.timestamp,
      }));

      console.log("Transformed data:", transformedData);
      setAuditLogs(transformedData);
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
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Audit Logs</h1>
      <div className="mb-4 flex justify-end items-center">
        <Button
          onClick={downloadCSV}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Download className="mr-2 h-4 w-4" /> Download CSV
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="font-semibold text-blue-800">
                Transaction ID
              </TableHead>
              <TableHead className="font-semibold text-blue-800">
                Timestamp
              </TableHead>
              <TableHead className="font-semibold text-blue-800">
                Action
              </TableHead>
              <TableHead className="font-semibold text-blue-800">
                User
              </TableHead>
              {/* <TableHead className="font-semibold text-blue-800">
                Manager
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell>{log.transactionId}</TableCell>
                <TableCell>{formatDate(log.timestamp)}</TableCell>
                <TableCell className="capitalize font-medium text-blue-600">
                  <span
                    className={`px-2 py-1 rounded-sm text-xs font-semibold
    ${
      log.action === "Approve"
        ? "bg-green-100 text-green-800"
        : log.action === "Submit"
        ? "bg-gray-200 text-gray-800"
        : log.action === "Reject"
        ? "bg-red-100 text-red-800"
        : "bg-inherit text-gray-800"
    }`}
                  >
                    {log.action}
                  </span>
                </TableCell>
                <TableCell>{log.user}</TableCell>
                {/* <TableCell>{log.manager}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>{" "}
    </div>
  );
};

export default AuditLogsPage;
