'use client';

import { useState } from 'react';

import ScanResultDialog from '@/components/ScanResultDialog';
import SummaryDialog from '@/components/SummaryDialog';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { Button as MUIButton } from "@mui/material";
import { Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function JoggingPage() {
    const [scanResultOpen, setScanResultOpen] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);
    const [scanResult, setScanResult] = useState({ category: '', color: '' });
    const [summary, setSummary] = useState({ distance: 0, duration: 0, trashCounts: {} });

    const handleUploadTrash = async (file: File | undefined) => {
        if (!file) return; // Handle the case where no file is selected
        console.log("Uploaded file:", file);
    
        // Simulate fetching scan result from backend
        const mockResult = { category: 'Plastic', color: 'Blue' };
        setScanResult(mockResult);
        setScanResultOpen(true);
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Extract the first selected file
        handleUploadTrash(file); // Pass the file to the upload handler
    };
    

    const handleEndJogging = async () => {
        // Simulate fetching summary from backend
        const mockSummary = { distance: 5.2, duration: 45, trashCounts: { Plastic: 3, Paper: 2 } };
        setSummary(mockSummary);
        setSummaryOpen(true);
    };

    return (
        <div>
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
                        <h1 className="text-white text-3xl font-semibold">
                            Jogging Tracker
                        </h1>
                    </div>
                </Header>

                <div className="flex flex-col items-center gap-6 mt-6">
                    {/* Upload Button with File Input */}
                    <Box>
                        <input
                            accept="image/*"
                            capture="environment" // Allows camera access on mobile devices
                            style={{ display: 'none' }}
                            id="upload-button-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="upload-button-file">
                            <MUIButton
                                component="span"
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
                                startIcon={<UploadFileIcon />}
                            >
                                Upload Trash
                            </MUIButton>
                        </label>
                    </Box>

                    <Button
                        onClick={handleEndJogging}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
                    >
                        End Jogging
                    </Button>
                </div>

                {/* Scan Result Dialog */}
                <ScanResultDialog
                    open={scanResultOpen}
                    onClose={() => setScanResultOpen(false)}
                    result={scanResult}
                />

                {/* Summary Dialog */}
                <SummaryDialog
                    open={summaryOpen}
                    onClose={() => setSummaryOpen(false)}
                    summary={summary}
                />
            </div>
        </div>
    );
}
