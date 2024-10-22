"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadMediaForm } from "@/features/share/upload-media-form";

export default function Share() {
  return (
    <section className={"flex flex-col gap-2"}>
      <Card>
        <CardHeader>
          <CardTitle>Share your perspective!</CardTitle>
          <CardDescription>
            Please share any photos and videos you think we would love to see!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={"pb-6"}>
            <p>How to share:</p>
            <ul className={"list-decimal list-inside"}>
              <li>Click &apos;Choose files&apos; below</li>
              <li>Select the photos or videos you want to share</li>
              <li>Click &apos;Upload&apos;</li>
            </ul>
          </div>
          <UploadMediaForm />
        </CardContent>
      </Card>
    </section>
  );
}
