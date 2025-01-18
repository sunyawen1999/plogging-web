import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Button from './Button';

interface ScanResultDialogProps {
    open: boolean; // 'open' is a boolean to control the dialog visibility
    onClose: () => void; // 'onClose' is a function to handle dialog close
    result: {
        category: string; // 'category' is the detected trash category
        color: string;    // 'color' is the bin color suggestion
    };
}

const ScanResultDialog: React.FC<ScanResultDialogProps> = ({
    open,
    onClose,
    result 
}) =>  {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Scan Result</DialogTitle>
            <DialogContent>
                <p>Category: {result.category}</p>
                <p>Bin Color: {result.color}</p>
                <Button onClick={onClose}>OK</Button>
            </DialogContent>
        </Dialog>
    );
}

export default ScanResultDialog;