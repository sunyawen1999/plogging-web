
import Header from "@/components/Header";
import React from "react";

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

interface SearchProps {
    searchParams: {
        title: string;
    }
};

export const revalidate = 0;

const historyData = [
  { startTime: '2025-01-19 08:30:00', distance: 0.1, duration: 2, blueNo: 1, greenNo: 0, blackNo: 0 },
  { startTime: '2025-01-18 08:30:00', distance: 3.5, duration: 31, blueNo: 0, greenNo: 1, blackNo: 3 },
  { startTime: '2025-01-17 09:30:00', distance: 4.2, duration: 45, blueNo: 2, greenNo: 0, blackNo: 4 },
];


const History = async ({searchParams}: SearchProps) => {

    return (
        <div className="
          bg-neutral-900
          rounded-lg
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
        ">
            <Header>
              <div className="mb-2 flex flex-col gap-y-6">
                {/* <h1 className="text-white text-3xl font-semibold">
                    History
                </h1> */}
                </div>
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
                    backgroundColor: "#2c2c2e", // 表格深色背景
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                #
                            </TableCell>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                Date
                            </TableCell>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                Distance (km)
                            </TableCell>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                Duration (min)
                            </TableCell>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                Recycle (Blue)
                            </TableCell>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                Compost (Green)
                            </TableCell>
                            <TableCell align="center" sx={{ color: "#66ff99", fontWeight: "bold" }}>
                                Trash (Black)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historyData.map((row, index) => (
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
                                    {new Date(row.startTime).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                                    {row.distance}
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                                    {row.duration}
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                                    {row.blueNo}
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                                    {row.greenNo}
                                </TableCell>
                                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                                    {row.blackNo}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        </div>
    )
};

export default History;