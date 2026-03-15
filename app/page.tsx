import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const page = async () => {
  'use cache'
  cacheLife('hours');
  const response=await fetch('http://localhost:3000/api/events')
  const {events}=await response.json()
  return (
    <div>
      <section>
        <h1 className="text-center">
          The hub for every Dev <br />
          Event !!
        </h1>
        <p className="text-center mt-5">
          Hackthons, meet-ups , all in one place{" "}
        </p>
        <ExploreBtn />
        <div className="mt-4">
          <h2>Featured Events</h2>
          <ul className="events">
            {events && events.map((event:IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
