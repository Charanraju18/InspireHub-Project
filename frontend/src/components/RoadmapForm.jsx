import React, { useState } from "react";

const RoadmapForm = () => {
  const [form, setForm] = useState({
    title: "",
    domain: "",
    description: "",
    difficulty: "Beginner",
    estimatedDurationWeeks: "",
    prerequisites: [""],
    tags: [""],
    steps: [
      {
        title: "",
        description: "",
        resources: [{ title: "", link: "", type: "" }],
      },
    ],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addToArray = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeFromArray = (field, index) => {
    // Ensure at least one prerequisite remains
    if (field === "prerequisites" && form[field].length <= 1) {
      return;
    }
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleStepChange = (stepIndex, field, value) => {
    const updatedSteps = [...form.steps];
    updatedSteps[stepIndex][field] = value;
    setForm({ ...form, steps: updatedSteps });
  };

  const handleResourceChange = (stepIndex, resIndex, field, value) => {
    const updatedSteps = [...form.steps];
    updatedSteps[stepIndex].resources[resIndex][field] = value;
    setForm({ ...form, steps: updatedSteps });
  };

  const addStep = () => {
    setForm({
      ...form,
      steps: [
        ...form.steps,
        {
          title: "",
          description: "",
          resources: [{ title: "", link: "", type: "" }],
        },
      ],
    });
  };

  const removeStep = (stepIndex) => {
    if (form.steps.length <= 1) return; // Keep at least one step
    const updatedSteps = [...form.steps];
    updatedSteps.splice(stepIndex, 1);
    setForm({ ...form, steps: updatedSteps });
  };

  const addResource = (stepIndex) => {
    const updatedSteps = [...form.steps];
    updatedSteps[stepIndex].resources.push({ title: "", link: "", type: "" });
    setForm({ ...form, steps: updatedSteps });
  };

  const removeResource = (stepIndex, resIndex) => {
    const updatedSteps = [...form.steps];
    if (updatedSteps[stepIndex].resources.length <= 1) return; // Keep at least one resource
    updatedSteps[stepIndex].resources.splice(resIndex, 1);
    setForm({ ...form, steps: updatedSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to backend here
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

  const removeButtonStyle = {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
  };

  const submitStyle = {
    ...buttonStyle,
    width: "100%",
    backgroundColor: "#28a745",
    fontWeight: "bold",
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const sectionStyle = {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    position: "relative",
  };

  const fieldContainerStyle = {
    marginBottom: "15px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "15px",
  };

  const arrayItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  };

  const resourceBlockStyle = {
    border: "1px solid #e0e0e0",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#fafafa",
    position: "relative",
  };

  const removeTopRightStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a New Roadmap
      </h2>

      <div style={gridStyle}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            style={inputStyle}
          />
        </div>
        <div>
          <label>Domain</label>
          <input
            name="domain"
            value={form.domain}
            onChange={handleChange}
            placeholder="Domain (e.g., AI, Frontend)"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={fieldContainerStyle}>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          style={textareaStyle}
        />
      </div>

      <div style={gridStyle}>
        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div>
          <label>Duration (in weeks)</label>
          <input
            type="number"
            name="estimatedDurationWeeks"
            value={form.estimatedDurationWeeks}
            onChange={handleChange}
            placeholder="Duration (in weeks)"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Prerequisites */}
      <div style={fieldContainerStyle}>
        <label>Prerequisites *</label>
        {form.prerequisites.map((item, index) => (
          <div key={index} style={arrayItemStyle}>
            <input
              value={item}
              onChange={(e) =>
                handleArrayChange("prerequisites", index, e.target.value)
              }
              placeholder="Enter prerequisite"
              style={{ ...inputStyle, marginBottom: "0", marginRight: "10px" }}
            />
            {form.prerequisites.length > 1 && (
              <button
                type="button"
                onClick={() => removeFromArray("prerequisites", index)}
                style={removeButtonStyle}
                title="Remove prerequisite"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray("prerequisites")}
          style={buttonStyle}
        >
          + Add Prerequisite
        </button>
      </div>

      {/* Tags */}
      <div style={fieldContainerStyle}>
        <label>Tags</label>
        {form.tags.map((item, index) => (
          <div key={index} style={arrayItemStyle}>
            <input
              value={item}
              onChange={(e) => handleArrayChange("tags", index, e.target.value)}
              placeholder="Enter tag"
              style={{ ...inputStyle, marginBottom: "0", marginRight: "10px" }}
            />
            {form.tags.length > 1 && (
              <button
                type="button"
                onClick={() => removeFromArray("tags", index)}
                style={removeButtonStyle}
                title="Remove tag"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addToArray("tags")}
          style={buttonStyle}
        >
          + Add Tag
        </button>
      </div>

      {/* Steps */}
      <div style={fieldContainerStyle}>
        <h3 style={{ marginTop: "30px" }}>Steps</h3>
        {form.steps.map((step, i) => (
          <div key={i} style={sectionStyle}>
            {form.steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(i)}
                style={removeTopRightStyle}
                title="Remove step"
              >
                ×
              </button>
            )}

            <label>Step Title</label>
            <input
              value={step.title}
              onChange={(e) => handleStepChange(i, "title", e.target.value)}
              placeholder="Step Title"
              style={inputStyle}
            />

            <label>Step Description</label>
            <textarea
              value={step.description}
              onChange={(e) =>
                handleStepChange(i, "description", e.target.value)
              }
              placeholder="Step Description"
              style={textareaStyle}
            />

            {/* Resources */}
            <div>
              <label
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginTop: "15px",
                }}
              >
                Resources
              </label>
              {step.resources.map((res, j) => (
                <div key={j} style={resourceBlockStyle}>
                  {step.resources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResource(i, j)}
                      style={removeTopRightStyle}
                      title="Remove resource"
                    >
                      ×
                    </button>
                  )}

                  <div style={gridStyle}>
                    <div>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Resource Title
                      </label>
                      <input
                        value={res.title}
                        onChange={(e) =>
                          handleResourceChange(i, j, "title", e.target.value)
                        }
                        placeholder="Resource Title"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Type
                      </label>
                      <input
                        value={res.type}
                        onChange={(e) =>
                          handleResourceChange(i, j, "type", e.target.value)
                        }
                        placeholder="Type (video, article...)"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <label style={{ fontSize: "14px", color: "#666" }}>
                    Resource Link
                  </label>
                  <input
                    value={res.link}
                    onChange={(e) =>
                      handleResourceChange(i, j, "link", e.target.value)
                    }
                    placeholder="Resource Link"
                    style={inputStyle}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addResource(i)}
                style={buttonStyle}
              >
                + Add Resource
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addStep} style={buttonStyle}>
          + Add Step
        </button>
      </div>

      <button type="button" onClick={handleSubmit} style={submitStyle}>
        ✅ Submit Roadmap
      </button>
    </div>
  );
};

export default RoadmapForm;
