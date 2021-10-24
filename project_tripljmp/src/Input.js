import "./Home.css";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";

function Input(props) {
  const [schoolName, setSchoolName] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [admissions, setAdmissions] = useState("");

  function addListings(e) {
    e.preventDefault();

    db.collection("listings").add({
      schoolName: schoolName,
      about: about,
      location: location,
      admissions: admissions,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSchoolName("");
    setAbout("");
    setLocation("");
    setAdmissions("");

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

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
      <h1 style={{ fontSize: "45pt" }}>Add a School</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          id="standard-basic"
          label="School"
          value={schoolName}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="About"
          multiline
          value={about}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          rows={4}
          onChange={(e) => setAbout(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Location"
          multiline
          value={location}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          rows={4}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Admissions"
          multiline
          value={admissions}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          rows={4}
          onChange={(e) => setAdmissions(e.target.value)}
        />
        <input
          type="file"
          style={{
            paddingBottom: "5vh",
            textAlign: "left",
            alignSelf: "flex-start",
            paddingLeft: "15vw",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={addListings}
          style={{ fontSize: "30px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Input;
