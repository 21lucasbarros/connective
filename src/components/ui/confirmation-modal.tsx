import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, X } from "lucide-react";
import { ReactNode } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Excluir",
  cancelText = "Cancelar",
  isDangerous = true,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-40"
        onClick={onCancel}
      />
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 pointer-events-none">
        <Card className="w-full max-w-sm border border-[#f0f0f0] shadow-lg pointer-events-auto">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="size-6 text-[#fc5735]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-[#222] mb-2">
                  {title}
                </h2>
                <p className="text-sm text-[#666] mb-6">{message}</p>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="border-[#e5e5e5] hover:bg-[#f8f8f8]"
                  >
                    {cancelText}
                  </Button>
                  <Button
                    type="button"
                    onClick={onConfirm}
                    className={
                      isDangerous
                        ? "bg-[#fc5735] hover:bg-[#e64826] text-white"
                        : "bg-[#f77f00] hover:bg-[#e67e00] text-white"
                    }
                  >
                    {confirmText}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
