import { notFound } from "next/navigation";
import Image from "next/image";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <div>
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
      </div>
      ;
    </div>
  );
};
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags =({tags}:{tags:string[]})=>(
  <div className="flex flex-row-gap-1.5 flex-wrap">
    {tags.map((tag)=>(
      <div className="pill" key={tag}>{tag}</div>

    ))}

  </div>
)
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`http://localhost:3000/api/events${slug}`);
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = await request.json();
  if (!description) return notFound();
  return (
    <section>
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={700}
            height={700}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="calendar"
              label={time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="calendar"
              label={location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="calendar"
              label={mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>
          <EventAgenda agendaItems={JSON.parse(agenda[0])}/>

          <section className="flex-col-gap-2">
            <h2>About the Organizer </h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={JSON.parse(tags[0])}/>
        </div>


        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
