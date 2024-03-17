import React, { useState } from "react";
import axios from "axios";

const SegmentPopup = ({ isOpen, onClose }) => {
  const [segmentNameInput, setSegmentNameInput] = useState("");
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

  const addSchema = () => {
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

  const cancelSegment = () => {
    setSegmentNameInput("");
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

  const handleSegmentNameChange = (e) => {
    setSegmentNameInput(e.target.value);
  };

  const handleTextFieldChange = (schema, value) => {
    setTextFieldValues({
      ...textFieldValues,
      [schema]: value,
    });
  };

  const sendDataToServer = () => {
    const dataToSend = {
      segment_name: segmentNameInput,
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
          position: "relative",
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

        <div
          className="p-3"
          style={{
            position: "relative",
          }}
        >
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
            value={segmentNameInput}
            onChange={handleSegmentNameChange}
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
            onClick={addSchema}
          >
            + Add new schema
          </button>
        </div>
        <div className="mt-auto">
          <div
            className="p-3 w-100"
            style={{ backgroundColor: "#e9ecef", position: "absolute" }}
          >
            <div className="d-flex justify-space-between">
              <button
                className="btn btn-info ml-3"
                onClick={sendDataToServer}
                style={{ marginRight: "10px" }}
              >
                Save the Segment
              </button>
              <button
                className="btn btn-light text-danger border"
                onClick={cancelSegment}
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

export default SegmentPopup;
