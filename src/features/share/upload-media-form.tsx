"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/features/share/use-file-upload";

export const UploadMediaForm = () => {
  const upload = useFileUpload();
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await upload(file.name, file);
    }
  };

  return (
    <form className={"flex flex-col gap-2"}>
      <Label htmlFor="media">Select your photos</Label>
      <Input
        id="media"
        type={"file"}
        multiple
        onChange={(e) => handleFileSelect(e)}
      />
      <Button type={"submit"}>Upload</Button>
    </form>
  );
};
