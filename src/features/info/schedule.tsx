import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getAllInfo } from "@/utils/db/getAllInfo";
import { Fragment } from "react";

export const Schedule = async () => {
  const supabase = createClient(cookies());
  const info = await getAllInfo({ supabase });

  if (!info) return;

  const { attendingNight, attendingDay } = info;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        <ul className={"list-disc list-inside"}>
          <table
            className={"grid"}
            style={{
              gridTemplateColumns: "1fr 3fr",
            }}
          >
            <tbody className={"contents"}>
              {attendingDay && (
                <Fragment>
                  <tr className={"contents border-b-amber-100 border-b-2"}>
                    <td>1:00pm</td>
                    <td>Arrival</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>2:00pm</td>
                    <td>Ceremony starts</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>2:30pm</td>
                    <td>Drinks reception</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>4:00pm</td>
                    <td>Move to dining room</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>4:15pm</td>
                    <td>Speeches</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>4:45pm</td>
                    <td>Wedding breakfast</td>
                  </tr>
                </Fragment>
              )}
              {attendingNight && (
                <Fragment>
                  <tr className={"contents"}>
                    <td>7:30pm</td>
                    <td>Party starts!</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>8:00pm</td>
                    <td>Cake cutting</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>21:30pm</td>
                    <td>Evening food</td>
                  </tr>
                  <tr className={"contents"}>
                    <td>2:00am</td>
                    <td>Event finishes</td>
                  </tr>
                </Fragment>
              )}
            </tbody>
          </table>
        </ul>
      </CardContent>
    </Card>
  );
};
