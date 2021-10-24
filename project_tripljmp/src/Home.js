import "./Home.css";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";
import MyListItem from "./MyLists";
import { Link } from "react-router-dom";
import View from "./View";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings();
  }, []);

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

  const [showView, setShowView] = useState(false);

  if (showView) {
    return <View setShowView={setShowView} id={showView}></View>;
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
      <h1 style={{ fontSize: "45pt" }}>Project Tripl Jmp</h1>
      <Link
        to="/input"
        style={{ paddingBottom: "20px", textDecoration: "none" }}
      >
        <Button type="submit" variant="contained" style={{ fontSize: "35px" }}>
          Create
        </Button>
      </Link>

      <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
        {listings.map((listing) => (
          <MyListItem
            setShowView={setShowView}
            showView={showView}
            id={listing.id}
            schoolName={listing.schoolName}
            about={listing.about}
            location={listing.location}
            admissions={listing.admissions}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
