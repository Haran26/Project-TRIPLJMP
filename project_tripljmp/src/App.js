import "./App.css";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";
import MyListItem from "./MyLists";

function App() {
  const [listings, setListings] = useState([]);
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    getListings();
  }, []); // blank to run only on first launch

  function getListings() {
    db.collection("listings").onSnapshot(function (querySnapshot) {
      setListings(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          schoolName: doc.data().schoolName,
          about: doc.data().about,
          location: doc.data().location,
          admissions: doc.data().admissions,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    db.collection("listings").add({
      schoolName: schoolName,
      about: "about",
      location: "location",
      admissions: "admissions",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSchoolName("");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Project Tripl Jmp</h1>
        <form>
          <TextField
            id="standard-basic"
            label="Write a List Item"
            value={schoolName}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(e) => setSchoolName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>

        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
          {listings.map((listing) => (
            <MyListItem
              id={listing.id}
              schoolName={listing.schoolName}
              about={listing.about}
              location={listing.location}
              admissions={listing.admissions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
