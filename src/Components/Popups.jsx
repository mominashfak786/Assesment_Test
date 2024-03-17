import React, { useState } from "react";
import axios from "axios";

const Popups = ({ isOpen, onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [availableSchema, setAvailableSchema] = useState([
    "First Name",
    "Last Name",
    "Gender",
    "Age",
    "Account Name",
    "City",
    "State",
  ]);
  const [textFieldValues, setTextFieldValues] = useState({});

  const handleAddSchema = () => {
    if (selectedSchema && !textFieldValues[selectedSchema]) {
      setTextFieldValues({
        ...textFieldValues,
        [selectedSchema]: "",
      });
      setAvailableSchema(
        availableSchema.filter((option) => option !== selectedSchema)
      );
    }
  };

  const handleCancelSegment = () => {
    setSegmentName("");
    setSelectedSchema("");
    setAvailableSchema([
      "First Name",
      "Last Name",
      "Gender",
      "Age",
      "Account Name",
      "City",
      "State",
    ]);
    setTextFieldValues({});
  };

  const handleSegmentName = (e) => {
    setSegmentName(e.target.value);
  };

  const handleTextFieldChange = (schema, value) => {
    setTextFieldValues({
      ...textFieldValues,
      [schema]: value,
    });
  };

  const sendDataToServer = () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: Object.keys(textFieldValues).map((schema) => ({
        [schema]: textFieldValues[schema],
      })),
    };
    console.log(dataToSend);

    axios
      .post(
        "https://webhook.site/2c63f783-94d9-4cb2-8ab0-376b09aba871",
        dataToSend
      )
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
      });
  };

  return (
    <div
      className={`popup ${
        isOpen
          ? "position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex justify-content-end"
          : "d-none"
      }`}
    >
      <div
        className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary"
        style={{
          width: "80vw",
          maxWidth: "380px",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <nav
          className="navbar navbar-expand-lg border-bottom border-body"
          data-bs-theme="dark"
          style={{ backgroundColor: "rgb(0, 188, 212)" }}
        >
          <div className="container-fluid">
            <div className="navbar-brand" href="#">
              <i className="bi bi-chevron-left" onClick={onClose}></i> View
              Audience
            </div>
          </div>
        </nav>

        <div className="p-3">
          <p
            style={{
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.75",
              letterSpacing: "0.00938em",
              fontWeight: 500,
            }}
          >
            Enter the Name of the Segment
          </p>

          <input
            type="text"
            className="form-control mb-3 shadow-none"
            placeholder="Name of the Segment"
            value={segmentName}
            onChange={handleSegmentName}
          />
          <p
            style={{
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.75",
              letterSpacing: "0.00938em",
              fontWeight: 500,
            }}
          >
            To save your segment, you need to add the schemas to build the query
          </p>
          {Object.keys(textFieldValues).map((schema) => (
            <input
              key={schema}
              type="text"
              className="form-control mb-3 shadow-none"
              placeholder={schema}
              value={textFieldValues[schema] || ""}
              onChange={(e) => handleTextFieldChange(schema, e.target.value)}
            />
          ))}
          <select
            className="form-select mb-3 shadow-none"
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
            displayEmpty
          >
            <option value="">Select an option</option>
            {availableSchema.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            style={{ color: "rgb(0, 188, 212)" }}
            className="btn btn-link mb-3"
            onClick={handleAddSchema}
          >
            + Add new schema
          </button>
        </div>
        <div style={{ marginTop: "100px" }} >
          <div className="p-3 w-100 " style={{ backgroundColor: "#e9ecef" }}>
            <div className="d-flex justify-space-between   ">
              <button
                className="btn btn-info ml-3"
                onClick={sendDataToServer}
                style={{ marginRight: "10px" }}
              >
                Save the Segment
              </button>
              <button
                className="btn btn-light text-danger border"
                onClick={handleCancelSegment}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popups;
