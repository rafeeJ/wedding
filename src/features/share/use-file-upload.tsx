export const useFileUpload = () => {
  return async (files: File[], token: string) => {
    for (const file of files) {
      const result = await fetch(`/api/upload?file=${file.name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { url, fields } = await result.json();
      const formData = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });
      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!upload.ok) {
        throw new Error(`Failed to upload ${file.name}`);
      }
    }
  };
};
