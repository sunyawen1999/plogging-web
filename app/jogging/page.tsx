'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import ScanResultDialog from '@/components/ScanResultDialog';
import SummaryDialog from '@/components/SummaryDialog';
import Header from '@/components/Header';
import Button from '@/components/Button';

import { Button as MUIButton, Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { getCategory } from '@/providers/api/category';
import { postJoggingRecord } from '@/providers/api/record';

export default function JoggingPage() {
  const searchParams = useSearchParams();
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

  const [startTime, setStartTime] = useState<string | null>(null);
  const [startLat, setStartLat] = useState<number | null>(null);
  const [startLng, setStartLng] = useState<number | null>(null);
  const [endLat, setEndLat] = useState<number | null>(null);
  const [endLng, setEndLng] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

useEffect(() => {
    const start = searchParams.get('start_time');
    const lat = searchParams.get('start_lat');
    const lng = searchParams.get('start_lng');
  
    if (start) setStartTime(start);
    setStartLat(lat ? parseFloat(lat) : 0);
    setStartLng(lng ? parseFloat(lng) : 0); 
  }, [searchParams]);
  

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const calculateDistance = async (startLat: number, startLng: number, endLat: number, endLng: number) => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLat},${startLng}&destinations=${endLat},${endLng}&key=${googleMapsApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.rows && data.rows[0].elements[0].status === 'OK') {
      const meters = data.rows[0].elements[0].distance.value;
      return meters / 1000; // Convert meters to kilometers
    }
    throw new Error('Failed to calculate distance');
  };

  const handleEndJogging = async () => {
    if (startLat === null || startLng === null) {
        alert('Start location not available.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setEndLat(latitude);
        setEndLng(longitude);

        try {
          const calculatedDistance = await calculateDistance(startLat, startLng, latitude, longitude);
          setDistance(calculatedDistance);

          const endTime = new Date().toISOString();

          const record = {
            user_id: 1,
            start_time: startTime || '',
            end_time: endTime,
            distance: calculatedDistance,
            duration: timeElapsed,
            blue_no: 3,
            green_no: 4,
            black_no: 5,
          };

          const response = await postJoggingRecord(record);
          console.log('Record posted successfully:', response);

          setSummary({
            distance: record.distance,
            duration: record.duration,
            startTime: record.start_time || '',
            endTime: record.end_time,
            blueNo: record.blue_no,
            greenNo: record.green_no,
            blackNo: record.black_no,
          });

          setSummaryOpen(true);
        } catch (error) {
          console.error('Error calculating distance or saving record:', error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enable location services.');
      }
    );
  };

  return (
    <div>
      <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
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
          onClose={() => {
            setScanResultOpen(false);
            setTimeout(() => setScanResult({ category: '', color: '' }), 200);
          }}
          result={scanResult}
          setIsUploading={setIsUploading}
        />

        {/* Summary Dialog */}
        <SummaryDialog open={summaryOpen} onClose={() => setSummaryOpen(false)} summary={summary} />
      </div>
    </div>
  );
}
