"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/features/share/use-file-upload";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";

export const UploadMediaForm = () => {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useFileUpload();
  const { toast } = useToast();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "You must be logged in to upload files.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFiles) return;
    const filesArray = Array.from(selectedFiles);
    try {
      setUploading(true);
      await upload(filesArray, session.access_token);
      toast({ title: "Upload successful!", variant: "default" });
      setSelectedFiles(null);
      setPreviewUrls([]);
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
      <div
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        className="grid items-center justify-center"
      >
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Preview ${index}`}
            className="object-cover"
          />
        ))}
      </div>
      <Button type={"submit"} disabled={uploading}>
        {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};
