"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MapCard = () => {
  const MAP_URL = `https://maps.googleapis.com/maps/api/staticmap?size=640x400&center=53.474202,-2.255197&zoom=18&key=${process.env.NEXT_PUBLIC_MAPS_API}&markers=color:blue%7Clabel:Wedding%7C53.474202,-2.255197`;
  const DUKES_92 = "https://maps.app.goo.gl/G6ooStaFdVqwraLr5";

  const handleClick = () => {
    window.open(DUKES_92, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div onClick={handleClick} className={"flex justify-center"}>
          <img src={MAP_URL} alt="Map of the venue" />
        </div>
      </CardContent>
    </Card>
  );
};
