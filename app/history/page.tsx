'use client';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { getUserJoggingRecords } from "@/providers/api/user"; // Import your API function

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const History = ({ searchParams }: SearchProps) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace this with the actual user ID you want to fetch records for
  const userId = 1;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getUserJoggingRecords(userId);
        setHistoryData(data);
      } catch (err) {
        console.error("Failed to fetch jogging records:", err);
        setError("Failed to load jogging records.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ margin: 4, color: "#66ff99", fontWeight: "bold" }}
      >
        Loading jogging history...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ margin: 4, color: "red", fontWeight: "bold" }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <div
      className="
          bg-neutral-900
          rounded-lg
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
        "
    >
      <Header>
        <div className="mb-2 flex flex-col gap-y-6"></div>
      </Header>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: "#1c1c1e",
          color: "#f5f5f5",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            marginBottom: 2,
            color: "#66ff99",
            fontWeight: "bold",
          }}
        >
          Jogging History
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#2c2c2e", // Dark background for the table
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ color: "#66ff99", fontWeight: "bold" }}
                >
                  #
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#66ff99", fontWeight: "bold" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#66ff99", fontWeight: "bold" }}
                >
                  Duration (min)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#66ff99", fontWeight: "bold" }}
                >
                  Recycle (Blue)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#66ff99", fontWeight: "bold" }}
                >
                  Compost (Green)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#66ff99", fontWeight: "bold" }}
                >
                  Trash (Black)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((row: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#333333" },
                    "&:hover": { backgroundColor: "#2c4c40", color: "#fff" },
                  }}
                >
                  <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                    {new Date(row.start_time).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                    {row.duration}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                    {row.blue_no}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                    {row.green_no}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                    {row.black_no}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default History;
