export type CalendarEntry = {
  month: string;
  monthIndex: number; // 1–12
  date: string | null;
  activity: string | null;
  isoDate: string | null;
  format: "physical" | "online" | "hybrid" | "ztd" | "none";
};

export const CALENDAR_2026: CalendarEntry[] = [
  { month: "January",   monthIndex: 1,  date: null,           activity: null,                                                          isoDate: null,         format: "none" },
  { month: "February",  monthIndex: 2,  date: "Sunday 8",     activity: "NEC Meeting (with Chapter leaders)",                          isoDate: "2026-02-08", format: "physical" },
  { month: "March",     monthIndex: 3,  date: "Saturday 14",  activity: "General Meeting + Seminar",                                   isoDate: "2026-03-14", format: "hybrid" },
  { month: "April",     monthIndex: 4,  date: "ZTD",          activity: "Zonal Activities / Meetings",                                 isoDate: null,         format: "ztd" },
  { month: "April",     monthIndex: 4,  date: "Sunday 19",    activity: "Organ Recital I",                                             isoDate: "2026-04-19", format: "physical" },
  { month: "May",       monthIndex: 5,  date: "Saturday 9",   activity: "CPD Workshop — Hymn Playing",                                 isoDate: "2026-05-09", format: "hybrid" },
  { month: "June",      monthIndex: 6,  date: "ZTD",          activity: "Zonal Activities / Meetings",                                 isoDate: null,         format: "ztd" },
  { month: "July",      monthIndex: 7,  date: "Saturday 18",  activity: "General Meeting + CPD Workshop — Choir Rehearsal Methods",    isoDate: "2026-07-18", format: "online" },
  { month: "August",    monthIndex: 8,  date: "Saturday 22",  activity: "Organ Recital II",                                            isoDate: "2026-08-22", format: "physical" },
  { month: "September", monthIndex: 9,  date: "ZTD",          activity: "Zonal Activities / Meetings",                                 isoDate: null,         format: "ztd" },
  { month: "October",   monthIndex: 10, date: "Saturday 17",  activity: "CPD Workshop — Service Playing",                              isoDate: "2026-10-17", format: "hybrid" },
  { month: "November",  monthIndex: 11, date: "Saturday 14",  activity: "General Meeting",                                             isoDate: "2026-11-14", format: "hybrid" },
  { month: "December",  monthIndex: 12, date: null,           activity: null,                                                          isoDate: null,         format: "none" },
];

export const FORMAT_LABELS: Record<string, string> = {
  physical: "In Person",
  online: "Online",
  hybrid: "Physical / Online",
  ztd: "Date to be announced",
  none: "",
};
