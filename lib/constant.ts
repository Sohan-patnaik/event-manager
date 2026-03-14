export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
};

// Curated list of upcoming/popular developer events.
// Image assets live under public/images and can be used directly
// via paths like "/images/event1.png".
export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit US 2025",
    slug: "react-summit-us-2025",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "Next.js Conf 2025",
    slug: "nextjs-conf-2025",
    location: "New York, NY, USA",
    date: "2025-10-15",
    time: "10:00 AM",
  },
  {
    image: "/images/event3.png",
    title: "Google I/O 2025",
    slug: "google-io-2025",
    location: "Mountain View, CA, USA",
    date: "2025-05-14",
    time: "09:30 AM",
  },
  {
    image: "/images/event4.png",
    title: "AWS re:Invent 2025",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV, USA",
    date: "2025-12-02",
    time: "11:00 AM",
  },
  {
    image: "/images/event5.png",
    title: "Vue.js Global Summit",
    slug: "vuejs-global-summit",
    location: "Amsterdam, Netherlands",
    date: "2025-09-18",
    time: "10:30 AM",
  },
  {
    image: "/images/event6.png",
    title: "JSConf EU 2025",
    slug: "jsconf-eu-2025",
    location: "Berlin, Germany",
    date: "2025-06-20",
    time: "09:00 AM",
  },
];