import { addMonths } from "date-fns";

export const DATE_OF_WEDDING = new Date("2024-10-25");
export const FOUR_MONTHS_BEFORE_WEDDING = addMonths(DATE_OF_WEDDING, -4);
