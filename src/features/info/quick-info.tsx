import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getAllInfo } from "@/utils/db/getAllInfo";
import Link from "next/link";

export const QuickInfo = async () => {
  const supabase = createClient(cookies());
  const info = await getAllInfo({ supabase });

  if (!info) return;

  const userHasPlusOne = !!info.plusOne;
  const { attendingNight, attendingDay } = info;

  const arrivalTime = attendingDay ? "1pm" : attendingNight ? "7:30pm" : "";
  const plusOneArrivalTime = info.plusOne
    ? info.plusOne.attendingDay
      ? "1pm"
      : info.plusOne.attendingNight
        ? "7:30pm"
        : ""
    : "";
  const plusOneName = info?.plusOne?.firstName + " " + info?.plusOne?.lastName;
  const plusOneFood = info?.plusOne?.food;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Info at a glance</CardTitle>
        <CardDescription>Please read this carefully!</CardDescription>
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        <div>
          <h2 className={"underline"}>Arrival Times:</h2>
          {attendingNight || attendingDay ? (
            <p>You need to arrive at: {arrivalTime}</p>
          ) : (
            <p>You need to RSVP!</p>
          )}
          {userHasPlusOne && (
            <p>
              {plusOneName} needs to arrive at: {plusOneArrivalTime}
            </p>
          )}
        </div>
        <div>
          <h2 className={"underline"}>Dress Code:</h2>
          <p>
            Autumnal colours, black-tie optional - which is wedding-speak for: a
            fusion between black-tie and formal fashion. For more info, check
            the{" "}
            <Link className={"underline"} href={"/faqs"}>
              FAQs page
            </Link>
          </p>
        </div>
        <div>
          {info.food && (
            <div>
              <h2 className={"underline"}>Your food choices:</h2>
              <ul className={"list-disc list-inside"}>
                {info.food.starter && <li>Starter: {info.food.starter}</li>}
                {info.food.main && <li>Main: {info.food.main}</li>}
                {info.food.dessert && <li>Dessert: {info.food.dessert}</li>}
              </ul>
            </div>
          )}
        </div>
        {info?.plusOne?.attendingDay && (
          <div>
            {plusOneFood && (
              <>
                <h2 className={"underline"}>
                  {plusOneName}&apos;s food choices:
                </h2>
                <ul className={"list-disc list-inside"}>
                  {plusOneFood.starter && (
                    <li>Starter: {plusOneFood.starter}</li>
                  )}
                  {plusOneFood.main && <li>Main: {plusOneFood.main}</li>}
                  {plusOneFood.dessert && (
                    <li>Dessert: {plusOneFood.dessert}</li>
                  )}
                </ul>
              </>
            )}
          </div>
        )}
        {/*<div className={"w-full h-px bg-slate-400"} />*/}
      </CardContent>
    </Card>
  );
};
