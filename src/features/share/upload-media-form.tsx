"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/features/share/use-file-upload";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { isAfter } from "date-fns";

const IS_WEDDING_OR_AFTER = isAfter(new Date(), new Date("2024-10-25"));

export const UploadMediaForm = () => {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useFileUpload();
  const { toast } = useToast();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);

      setSelectedFiles(newFiles);
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleDeleteFile = (index: number) => {
    if (!selectedFiles) return;
    const x = confirm("Are you sure you want to delete this file?");
    if (!x) return;

    const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index);
    setSelectedFiles(newFiles.length ? newFiles : null);
    setPreviewUrls(newFiles.map((file) => URL.createObjectURL(file)));
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

  if (!IS_WEDDING_OR_AFTER) {
    return <p>Coming soon!</p>;
  }

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
          <div key={index} className="relative h-24">
            <img src={url} alt={`Preview ${index}`} className="object-cover" />
            <button
              type="button"
              onClick={() => handleDeleteFile(index)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              <X />
            </button>
          </div>
        ))}
      </div>
      <Button type={"submit"} disabled={uploading}>
        {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};
