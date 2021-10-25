import { Button, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { db } from "./firebase_config";

export default function MyListItem({
  id,
  schoolName,
  about,
  location,
  admissions,
  showView,
  setShowView,
  showEdit,
  setShowEdit,
}) {
  function deleteListing() {
    db.collection("listings").doc(id).delete();
  }

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText primary={schoolName}></ListItemText>
      </ListItem>
      <Button onClick={() => setShowView(id)}>View</Button>
      <Button onClick={() => setShowEdit(id)}>Edit</Button>
      <Button onClick={deleteListing}>X</Button>
    </div>
  );
}
