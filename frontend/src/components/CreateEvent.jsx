import { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [form, setForm] = useState({
    title: "",
    intro: "",
    sections: [
      {
        heading: "",
        points: [""],
        paragraph: "",
      },
    ],
    schedule: {
      price: "",
      instructor: "",
      image: "",
      startTime: "",
      endTime: "",
      participants: "",
      location: "",
    },
    joinLink: "",
  });

  const handleChange = (e, sectionIndex, pointIndex) => {
    const { name, value, type } = e.target;

    // For schedule fields
    if (sectionIndex === undefined && name in form.schedule) {
      const newValue =
        type === "datetime-local" ? new Date(value).toISOString() : value;

      setForm({
        ...form,
        schedule: {
          ...form.schedule,
          [name]: newValue,
        },
      });
    }
    // For sections
    else if (sectionIndex !== undefined) {
      const newSections = [...form.sections];
      if (pointIndex !== undefined) {
        newSections[sectionIndex].points[pointIndex] = value;
      } else {
        newSections[sectionIndex][name] = value;
      }
      setForm({ ...form, sections: newSections });
    }
    // For top-level fields
    else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { heading: "", points: [""], paragraph: "" },
      ],
    });
  };

  const addPoint = (sectionIndex) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].points.push("");
    setForm({ ...form, sections: newSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSchedule = {
      ...form.schedule,
      startTime: form.schedule.startTime
        ? new Date(form.schedule.startTime).toISOString()
        : "",
      endTime: form.schedule.endTime
        ? new Date(form.schedule.endTime).toISOString()
        : "",
    };

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("intro", form.intro);
    formData.append("joinLink", form.joinLink);

    formData.append("sections", JSON.stringify(form.sections));

    // Upload image directly (use "image", not "schedule[image]")
    formData.append("image", form.schedule.image);

    // JSON string for schedule except image
    const { image, ...scheduleWithoutImage } = form.schedule;
    formData.append("schedule", JSON.stringify(scheduleWithoutImage));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Event Created Successfully!");
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create New Event
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Title</label>
        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Intro</label>
        <textarea
          name="intro"
          placeholder="Intro"
          value={form.intro}
          onChange={handleChange}
          required
          style={textareaStyle}
        />
      </div>

      <h3>Sections</h3>
      {form.sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
            backgroundColor: "#fff",
          }}
        >
          <label>Heading</label>
          <input
            name="heading"
            placeholder="Heading"
            value={section.heading}
            onChange={(e) => handleChange(e, sectionIndex)}
            required
            style={inputStyle}
          />

          {section.points.map((point, pointIndex) => (
            <input
              key={pointIndex}
              placeholder={`Point ${pointIndex + 1}`}
              value={point}
              onChange={(e) => handleChange(e, sectionIndex, pointIndex)}
              required
              style={inputStyle}
            />
          ))}

          <button
            type="button"
            onClick={() => addPoint(sectionIndex)}
            style={buttonStyle}
          >
            + Add Point
          </button>

          <br />
          <label>Paragraph</label>
          <textarea
            name="paragraph"
            placeholder="Paragraph"
            value={section.paragraph}
            onChange={(e) => handleChange(e, sectionIndex)}
            required
            style={textareaStyle}
          />
        </div>
      ))}

      <button type="button" onClick={addSection} style={buttonStyle}>
        + Add Section
      </button>

      <h3 style={{ marginTop: "30px" }}>Schedule</h3>
      {[
        "price",
        "instructor",
        "image",
        "startTime",
        "endTime",
        "participants",
        "location",
      ].map((field) => (
        <div key={field} style={{ marginBottom: "15px" }}>
          <label>{capitalize(field)}</label>
          <input
            name={field}
            type={
              field === "image"
                ? "file"
                : field.includes("Date")
                ? "date"
                : field.includes("Time")
                ? "datetime-local"
                : "text"
            }
            onChange={(e) =>
              field === "image"
                ? setForm({
                    ...form,
                    schedule: {
                      ...form.schedule,
                      image: e.target.files[0],
                    },
                  })
                : handleChange(e)
            }
            required
            style={inputStyle}
          />
        </div>
      ))}

      <div style={{ marginBottom: "15px" }}>
        <label>Join Link</label>
        <input
          name="joinLink"
          placeholder="Join Link"
          value={form.joinLink}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <button type="submit" style={submitStyle}>
        ✅ Submit Event
      </button>
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "80px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "8px 12px",
  margin: "10px 0",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const submitStyle = {
  ...buttonStyle,
  width: "100%",
  backgroundColor: "#28a745",
  fontWeight: "bold",
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export default EventForm;
