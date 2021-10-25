import React, { useEffect, useState } from "react";
import { db } from "./firebase_config";
import "./Home.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage } from "./firebase_config";

function Edit(props) {
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
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  function addListings(e) {
    e.preventDefault();

    if (image != null) {
      handleUpload().then((url) => {
        db.collection("listings")
          .doc(props.id)
          .set({
            schoolName: schoolName?.length ? schoolName : listing?.schoolName,
            about: about?.length ? about : listing?.about,
            location: location?.length ? location : listing?.location,
            admissions: admissions?.length ? admissions : listing?.admissions,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            url: url?.length ? url : listing?.url,
          });
      });
    } else {
      db.collection("listings")
        .doc(props.id)
        .set({
          schoolName: schoolName?.length ? schoolName : listing?.schoolName,
          about: about?.length ? about : listing?.about,
          location: location?.length ? location : listing?.location,
          admissions: admissions?.length ? admissions : listing?.admissions,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          url: url?.length ? url : listing?.url,
        });
    }

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    let url = null;
    await storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((u) => {
        console.log(u);
        // setUrl(u);
        // console.log(url);
        url = u;
      });
    console.log("new: ", url);
    return url;
  };

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
      <h1 style={{ fontSize: "45pt" }}>View/Edit Listing</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>School</h1>
        <TextField
          id="standard-basic"
          label=""
          value={schoolName != null ? schoolName : listing?.schoolName}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <h1>About</h1>
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          value={about != null ? about : listing?.about}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          rows={4}
          onChange={(e) => setAbout(e.target.value)}
        />
        <h1>Location</h1>
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          value={location != null ? location : listing?.location}
          style={{ width: "70vw", paddingBottom: "5vh" }}
          rows={4}
          onChange={(e) => setLocation(e.target.value)}
        />
        <h1>Admission</h1>
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          value={admissions != null ? admissions : listing?.admissions}
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
          onChange={handleChange}
        />
        <div style={{ flexDirection: "row", paddingBottom: "40px" }}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => props.setShowView()}
            style={{ fontSize: "30px" }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ visibility: "hidden" }}
          ></Button>
          <Button
            type="submit"
            variant="contained"
            onClick={addListings}
            style={{ fontSize: "30px" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Edit;
