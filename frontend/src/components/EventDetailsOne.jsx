import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetailsOne = () => {
  const { id } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [now, setNow] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then((res) => setSelectedEvent(res.data))
      .catch((err) => console.error("Error loading event", err));
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const parseTimeToDate = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  if (!selectedEvent) {
    return <div className="container py-75">Loading event...</div>;
  }

  const start = new Date(selectedEvent.schedule.startTime);
  const end = new Date(selectedEvent.schedule.endTime);
  const durationMs = end - start;
  const durationMins = Math.floor(durationMs / 60000);
  const hours = Math.floor(durationMins / 60);
  const minutes = durationMins % 60;
  const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const live = () => now >= start && now <= end;
  const upcoming = () => now < start;
  return (
    <section className="course-list-view py-75 bg-white">
      <div className="container container--lg">
        <img
          src={
            selectedEvent?.schedule?.image?.startsWith("/uploads")
              ? `http://localhost:5000${selectedEvent.schedule.image}`
              : selectedEvent?.schedule?.image ||
                "/assets/images/thumbs/event-detail-img1.png"
          }
          alt="Event Image"
        />
        <div className="container mt-60">
          <div className="row gy-4">
            <div className="col-lg-8">
              <h1 className="display-4 mb-24 fw-semibold">
                {selectedEvent.title}
              </h1>
              <p className="text-neutral-700">{selectedEvent.intro}</p>

              {selectedEvent.sections.map((section, index) => (
                <div key={index}>
                  <span className="d-block border-bottom border-top-0 border-dashed border-main-100 my-32" />
                  <h2 className="mb-16">{section.heading}</h2>
                  <ul className="list-dotted d-flex flex-column gap-8">
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  {section.paragraph && (
                    <p className="mt-16 text-neutral-700">
                      {section.paragraph}
                    </p>
                  )}
                </div>
              ))}

              <div className="position-relative my-32">
                <img
                  src="/assets/images/thumbs/event-detail-img3.png"
                  className="rounded-12 cover-img"
                  alt=""
                />
                <span
                  onClick={() => setIsOpen(true)}
                  className="play-button position-absolute start-50 top-50 translate-middle z-1 w-72 h-72 flex-center bg-main-two-600 text-white rounded-circle text-2xl"
                >
                  <i className="ph-fill ph-play" />
                </span>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white box-shadow-md rounded-12 p-12 d-flex flex-column gap-12 border border-neutral-30 mt--200px">
                <div className="rounded-12 bg-main-25 p-24">
                  <div className="flex-between gap-16 mb-16">
                    <div className="flex-align gap-12">
                      <i className="ph-bold ph-calendar-dot" />
                      <span>Start Date</span>
                    </div>
                    <span>
                      {selectedEvent.schedule.startTime.split("T")[0]}
                    </span>
                  </div>
                  <div className="flex-between gap-16 mb-16">
                    <div className="flex-align gap-12">
                      <i className="ph-bold ph-hourglass" />
                      <span>Duration</span>
                    </div>
                    <span>{duration}</span>
                  </div>
                  <div className="flex-between gap-16 mb-16">
                    <div className="flex-align gap-12">
                      <i className="ph-bold ph-clock" />
                      <span>Start Time</span>
                    </div>
                    <span>
                      {new Date(
                        selectedEvent.schedule.startTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <div className="flex-between gap-16 mb-16">
                    <div className="flex-align gap-12">
                      <i className="ph-bold ph-clock" />
                      <span>End Time</span>
                    </div>
                    <span>
                      {new Date(
                        selectedEvent.schedule.endTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>

                {live() ? (
                  <a
                    href={selectedEvent.joinLink}
                    className="btn btn-primary w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Now
                  </a>
                ) : upcoming() ? (
                  <div
                    className="btn btn-secondary w-100"
                    style={{
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                      opacity: 0.6,
                    }}
                  >
                    Upcoming Event
                  </div>
                ) : (
                  <div
                    className="btn btn-secondary w-100"
                    style={{
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                      opacity: 0.6,
                    }}
                  >
                    Event Ended
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsOne;
