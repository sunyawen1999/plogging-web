import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useRouter } from "next/navigation";

import Button from './Button';

interface SummaryDialogProps {
    open: boolean; 
    onClose: () => void; 
    summary: {
        distance: number;
        duration: number;
        trashCounts: { [key: string]: number };
    };
}

const ScanResultDialog: React.FC<SummaryDialogProps> = ({
    open,
    onClose,
    summary 
}) =>  {
    const router = useRouter();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Jogging Summary</DialogTitle>
            <DialogContent>
                <p>Total Distance: {summary.distance} km</p>
                <p>Total Duration: {summary.duration} minutes</p>
                <p>Trash Collected:</p>
                <ul>
                    {Object.entries(summary.trashCounts).map(([type, count]) => (
                        <li key={type}>
                            {type}: {count}
                        </li>
                    ))}
                </ul>
                <Button onClick={() => router.push('/history')}>Go to History</Button>
            </DialogContent>
        </Dialog>
    );
}

export default ScanResultDialog;