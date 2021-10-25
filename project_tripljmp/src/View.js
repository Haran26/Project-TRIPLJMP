import React, { useEffect, useState } from "react";
import { db } from "./firebase_config";
import "./Home.css";
import { Button } from "@material-ui/core";
import {
  FaLocationArrow,
  FaSchool,
  FaWpforms,
  FaFileImage,
} from "react-icons/fa";

function View(props) {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    getListings();
  }, []);

  function getListings() {
    db.collection("listings")
      .doc(props.id)
      .get()
      .then((doc) => setListing(doc.data()));
  }
  const [schoolName, setSchoolName] = useState(null);
  const [about, setAbout] = useState(null);
  const [location, setLocation] = useState(null);
  const [admissions, setAdmissions] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2 style={{ fontSize: "40pt" }}>
        {schoolName != null ? schoolName : listing?.schoolName}
      </h2>

      <h1 style={{ fontSize: "30pt" }}>
        About Our School&nbsp; <FaSchool />
      </h1>
      <h3 style={{ fontSize: "20pt", maxWidth: "60vw", paddingBottom: "2vh" }}>
        {about != null ? about : listing?.about}
      </h3>

      <h1 style={{ fontSize: "30pt" }}>
        Location&nbsp; <FaLocationArrow />{" "}
      </h1>
      <h3 style={{ fontSize: "20pt", maxWidth: "60vw", paddingBottom: "2vh" }}>
        {location != null ? location : listing?.location}
      </h3>

      <h1 style={{ fontSize: "30pt" }}>
        Admissions&nbsp; <FaWpforms />{" "}
      </h1>
      <h3 style={{ fontSize: "20pt", maxWidth: "60vw", paddingBottom: "2vh" }}>
        {admissions != null ? admissions : listing?.admissions}
      </h3>

      <h1 style={{ fontSize: "30pt" }}>
        Gallery&nbsp; <FaFileImage />
      </h1>
      <img
        src={listing?.url || "https://via.placeholder.com/300"}
        alt="firebase-image"
        style={{ paddingBottom: "6vh", width: "300px", height: "300px" }}
      />

      <Button
        type="submit"
        variant="contained"
        onClick={() => props.setShowView()}
        style={{ fontSize: "30px" }}
      >
        Back
      </Button>
    </div>
  );
}
export default View;
