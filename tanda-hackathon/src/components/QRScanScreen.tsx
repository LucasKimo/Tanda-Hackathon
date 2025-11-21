import { Button } from "../components/ui/button";
import { QrCode, ArrowLeft } from "lucide-react";

interface QRScanScreenProps {
  onScanComplete: () => void;
  onBack: () => void;
}

export const QRScanScreen = ({ onScanComplete, onBack }: QRScanScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <Button
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-display font-semibold">Scan Event QR</h2>
      </div>

      {/* Scan Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="relative animate-scale-in">
          {/* Scanner Frame */}
          <div className="w-72 h-72 border-4 border-primary rounded-3xl relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            {/* Animated scanning line */}
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-primary/30" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-2xl" />
          </div>

          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        <div className="text-center space-y-2 max-w-sm">
          <p className="text-lg font-semibold">Position the QR code</p>
          <p className="text-sm text-muted-foreground">
            Align the event QR code within the frame to join
          </p>
        </div>

        {/* Demo: Simulate scan */}
        <Button
          onClick={onScanComplete}
          className="mt-8"
        >
          Simulate Scan (Demo)
        </Button>
      </div>
    </div>
  );
};
