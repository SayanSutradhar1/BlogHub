"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

interface PreviewModalProps {
  title: string;
  content: string;
  image: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreviewModal = ({
  title,
  content,
  image,
  open,
  onOpenChange,
}: PreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 border-border/40 bg-card/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden animate-in fade-in duration-300">
        <Card className="border-0 bg-transparent">
          {/* Header */}
          <DialogHeader className="flex justify-between items-center border-b border-border/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <Plus className="w-6 h-6 text-blue-600" />
              <DialogTitle className="text-2xl font-semibold">Preview</DialogTitle>
            </div>
          </DialogHeader>

          {/* Body */}
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Title */}
            <h2 className="text-2xl font-bold">{title}</h2>

            {/* Image */}
            {image && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-blue max-w-full">
              <div dangerouslySetInnerHTML={{__html:content}}/>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
