'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // 动态加载组件
import Header from '@/components/Header';
import Button from '@/components/Button';
import { Button as MUIButton, Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// 动态加载组件，禁用 SSR
const ScanResultDialog = dynamic(() => import('@/components/ScanResultDialog'), { ssr: false });
const SummaryDialog = dynamic(() => import('@/components/SummaryDialog'), { ssr: false });

export default function JoggingPage() {
    const [scanResultOpen, setScanResultOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);
    const [scanResult, setScanResult] = useState({ category: '', color: '' });
    const [summary, setSummary] = useState({
        distance: 0,
        duration: 0,
        startTime: '',
        endTime: '',
        blueNo: 0,
        greenNo: 0,
        blackNo: 0,
    });

    const [timeElapsed, setTimeElapsed] = useState(0); // Seconds elapsed

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, []);

    // Format time into HH:MM:SS
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleUploadTrash = async (file: File | undefined) => {
        if (!file) return; // Handle the case where no file is selected
        console.log('Uploaded file:', file);

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
        const mockSummary = {
            distance: 0.1,
            duration: 2,
            startTime: '2025-01-19T09:00:00',
            endTime: '2025-01-19T10:00:00',
            blueNo: 1,
            greenNo: 0,
            blackNo: 0,
        };

        setSummary(mockSummary);
        setSummaryOpen(true);
    };

    return (
        <div>
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
                    <div className="mb-2 flex flex-col gap-y-6">
                        <h1 className="text-white text-3xl font-semibold">Jogging Tracker</h1>
                    </div>
                </Header>

                <div className="flex flex-col items-center gap-6 mt-6">
                    {/* Timer */}
                    <Box
                        sx={{
                            backgroundColor: '#1e1e1e',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 'auto',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#66ff99',
                                fontFamily: "'Courier New', Courier, monospace",
                                fontWeight: 'bold',
                            }}
                        >
                            Jogging Time: {formatTime(timeElapsed)}
                        </Typography>
                    </Box>

                    {/* Upload Button with File Input */}
                    <Box>
                        {typeof window !== 'undefined' && (
                            <input
                                accept="image/*"
                                capture="environment" // Allows camera access on mobile devices
                                style={{ display: 'none' }}
                                id="upload-button-file"
                                type="file"
                                onChange={handleFileChange}
                            />
                        )}
                        <label htmlFor="upload-button-file">
                            <MUIButton
                                component="span"
                                className="bg-green-500 hover:bg-green-600 text-black px-6 py-2"
                                startIcon={<UploadFileIcon focusable="false" />}
                            >
                                Snap and Sort Waste with AI
                            </MUIButton>
                        </label>
                    </Box>

                    {/* End Jogging Button */}
                    <Button
                        onClick={handleEndJogging}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 w-[240px]"
                    >
                        End Jogging
                    </Button>
                </div>

                {/* Scan Result Dialog */}
                <ScanResultDialog
                    open={scanResultOpen}
                    onClose={() => setScanResultOpen(false)}
                    result={scanResult}
                    setIsUploading={setIsUploading}
                />

                {/* Summary Dialog */}
                <SummaryDialog open={summaryOpen} onClose={() => setSummaryOpen(false)} summary={summary} />
            </div>
        </div>
    );
}
