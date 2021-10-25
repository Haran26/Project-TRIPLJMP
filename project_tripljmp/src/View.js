import React, { useEffect, useState } from "react";
import { db } from "./firebase_config";
import "./Home.css";
import { Button } from "@material-ui/core";
import { FaLocationArrow } from "react-icons/fa";

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
  console.log(schoolName);

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
      <h2 style={{ fontSize: "30pt", paddingBottom: "2vh" }}>
        {schoolName != null ? schoolName : listing?.schoolName}
      </h2>
      <h3 style={{ fontSize: "15pt", maxWidth: "60vw", paddingBottom: "2vh" }}>
        <FaLocationArrow /> {location != null ? location : listing?.location}
      </h3>
      <h3 style={{ fontSize: "15pt", maxWidth: "60vw", paddingBottom: "2vh" }}>
        {admissions != null ? admissions : listing?.admissions}
      </h3>
      <h3 style={{ fontSize: "15pt", maxWidth: "40vw", paddingBottom: "4vh" }}>
        {about != null ? about : listing?.about}
      </h3>

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
