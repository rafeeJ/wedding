"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Info() {
  const MAP_URL = `https://maps.googleapis.com/maps/api/staticmap?size=1000x400&center=53.474202,-2.255197&zoom=18&key=${process.env.MAPS_API}&markers=color:blue%7Clabel:S%7C53.474202,-2.255197`;
  const DUKES_92 = "https://maps.app.goo.gl/G6ooStaFdVqwraLr5";

  const handleClick = () => {
    window.open(DUKES_92, "_blank");
  };
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div onClick={handleClick}>
            <img src={MAP_URL} alt="Map of the venue" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
