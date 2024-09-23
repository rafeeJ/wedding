import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserRSVP } from "@/utils/db/getUserRSVP";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const QuickInfo = async () => {
  const supabase = createClient(cookies());
  const user = await getUserRSVP({ supabase });

  if (!user) return;

  const { attending_night, attending_day } = user;

  const copy = attending_day
    ? "Please arrive at 1pm"
    : attending_night
      ? "Please arrive at 7pm"
      : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Info at a glance</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className={"text-lg font"}>Arrival Time:</h3>
        <p>{copy}</p>
      </CardContent>
    </Card>
  );
};
