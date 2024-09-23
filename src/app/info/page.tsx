import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickInfo } from "@/features/info/quick-info";
import { MapCard } from "@/features/info/map-card";

export default function Info() {
  return (
    <section className={"flex flex-col gap-2"}>
      <QuickInfo />
      <MapCard />
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className={"list-disc list-inside"}>
            <li>1pm</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
