"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/features/share/use-file-upload";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UploadMediaForm = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const upload = useFileUpload();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFiles) return;
    const filesArray = Array.from(selectedFiles);
    try {
      setUploading(true);
      await upload(filesArray);
      toast({ title: "Upload successful!", variant: "default" });
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({ title: "Something went wrong.", variant: "destructive" });
    }
    setUploading(false);
  };

  return (
    <form className={"flex flex-col gap-2"} onSubmit={handleUpload}>
      <Label htmlFor="media">Select your photos</Label>
      <Input
        id="media"
        type={"file"}
        multiple
        onChange={handleFileSelect}
        ref={fileInputRef}
        accept={"image/*,video/*"}
      />
      <Button type={"submit"} disabled={uploading}>
        {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};
