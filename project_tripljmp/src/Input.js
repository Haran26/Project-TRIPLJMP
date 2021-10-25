import "./Home.css";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";
import { storage } from "./firebase_config";

function Input(props) {
  const [schoolName, setSchoolName] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [admissions, setAdmissions] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  function addListings(e) {
    e.preventDefault();

    if (image != null) {
      handleUpload().then((url) => {
        db.collection("listings").add({
          schoolName: schoolName,
          about: about,
          location: location,
          admissions: admissions,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          url: url,
        });
      });
    } else {
      db.collection("listings").add({
        schoolName: schoolName,
        about: about,
        location: location,
        admissions: admissions,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        url: url,
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
          onChange={handleChange}
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
