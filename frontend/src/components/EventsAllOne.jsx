import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import img from "../assets/images/thumbs/event-detail-img1.png";

const getImageUrl = (image) => {
  if (!image) return "/assets/images/thumbs/event-detail-img1.png"; // fallback

  // If image path starts with /uploads or something that needs backend prefix
  if (image.startsWith("/uploads")) {
    return `http://localhost:5000${image}`;
  }

  // Otherwise, assume it's a frontend relative path, use as is
  return image;
};

const EventsAllOne = () => {
  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [events, setEvents] = useState([]); // <-- use this for fetched data
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  // Fetch events from backend on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data.map((event) => {
          const startTime = new Date(event.schedule.startTime);
          const endTime = new Date(event.schedule.endTime);
          const instructor = event.schedule.instructor || "Unknown Instructor";
          const location = event.schedule.location || "Online";
          return {
            ...event,
            id: event._id,
            startTime,
            endTime,
            instructor,
            location,
          };
        });
        setEvents(parsedData);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const isLive = (event) => now >= event.startTime && now <= event.endTime;
  const isUpcoming = (event) => now < event.startTime;
  const isExpired = (event) => now > event.endTime;

  const handleSearch = () => {
    const filtered = events.filter((event) => {
      // <-- use `events` here instead of static array
      const titleMatch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      const statusMatch =
        statusFilter === "All" ||
        (statusFilter === "Live" && isLive(event)) ||
        (statusFilter === "Upcoming" && isUpcoming(event)) ||
        (statusFilter === "Ended" && isExpired(event));

      return titleMatch && statusMatch;
    });

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, statusFilter, now, events]); // add events here so filter updates on data fetch

  // ...rest of your component rendering code stays the same, but use filteredEvents

  return (
    <div className="container px-4">
      <div className="d-flex flex-wrap gap-10 align-items-center mb-4 m-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "250px" }}
        />
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "160px" }}
        >
          <option value="All">All</option>
          <option value="Live">Live Now</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ended">Ended</option>
        </select>
      </div>

      <div className="d-flex justify-content-start flex-wrap gap-5 pb-10">
        {filteredEvents.length === 0 ? (
          <p className="text-center w-100 text-muted">No events found.</p>
        ) : (
          [...filteredEvents]
            .sort((a, b) => a.startTime - b.startTime)
            .map((event) => {
              const live = isLive(event);
              const upcoming = isUpcoming(event);
              const expired = isExpired(event);

              return (
                // <Link to={`/event-details/${event.id}`}>
                <div
                  key={event.id}
                  className="col-sm-6 pt-6 pb-8 m-10"
                  style={{ flex: "0 0 30%", maxWidth: "30%" }}
                  onClick={() => {
                    if (event.id) {
                      navigate(`/event-details/${event.id}`, {
                        state: { event },
                      });
                    } else {
                      console.warn("Event ID missing", event);
                    }
                  }}
                  role="button"
                >
                  <div className="scale-hover-item bg-light rounded-16 p-12 h-100 border">
                    <div className="rounded-12 overflow-hidden position-relative">
                      <img
                        src={getImageUrl(event.schedule?.image)}
                        alt="Event"
                        className="rounded-12 w-100"
                      />

                      <div
                        className="position-absolute inset-block-start-0 inset-inline-start-0 mt-12 ms-12 px-2 py-1 rounded-4"
                        style={{
                          minWidth: "40px",
                          backgroundColor: "#E6F0FF",
                          color: "#003366",
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="fw-bold lh-3"
                          style={{ fontSize: "14px" }}
                        >
                          {event.startTime
                            .getDate()
                            .toString()
                            .padStart(2, "0")}
                        </div>
                        <div
                          className="text-uppercase"
                          style={{ fontSize: "12px" }}
                        >
                          {event.startTime.toLocaleString("default", {
                            month: "short",
                          })}
                        </div>
                      </div>

                      <div
                        className={`position-absolute inset-block-start-0 inset-inline-end-0 mt-20 me-20 px-12 py-8 rounded-8 text-white text-sm fw-medium ${
                          live
                            ? "bg-success"
                            : expired
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {live ? "LIVE NOW" : expired ? "Ended" : "Upcoming"}
                      </div>
                    </div>

                    <div className="pt-3">
                      <h5 className="mb-1">{event.title}</h5>
                      <p className="text-muted mb-1">
                        Instructor: {event.instructor}
                      </p>
                      <p className="text-muted mb-1">
                        Time: {event.startTime.toLocaleTimeString()} -{" "}
                        {event.endTime.toLocaleTimeString()}
                      </p>
                      <p className="text-muted mb-2">
                        Location: {event.location}
                      </p>

                      {live ? (
                        <a
                          href={event.joinLink}
                          className="btn btn-primary w-100"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Join Now
                        </a>
                      ) : upcoming ? (
                        <div
                          className="btn btn-secondary w-100"
                          style={{
                            pointerEvents: "auto",
                            cursor: "not-allowed",
                            opacity: 0.6,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Starts at {event.startTime.toLocaleTimeString()}
                        </div>
                      ) : (
                        <div
                          className="btn btn-secondary w-100"
                          style={{
                            pointerEvents: "auto",
                            cursor: "not-allowed",
                            opacity: 0.6,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Event Ended
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                // </Link>
              );
            })
        )}
      </div>
    </div>
  );
};

export default EventsAllOne;
