import { QuickInfo } from "@/features/info/quick-info";
import { MapCard } from "@/features/info/map-card";
import { Schedule } from "@/features/info/schedule";

export default function Info() {
  return (
    <section className={"flex flex-col gap-2"}>
      <QuickInfo />
      <MapCard />
      <Schedule />
    </section>
  );
}
