"use client"; // Add this to indicate it's a Client Component

import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update the pantry list
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, count: doc.data().count });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  // Add a new item to the pantry
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item.name);
    await setDoc(docRef, { count: item.count });
    await updatePantry(); // Refresh the pantry list
  };

  // Remove an item from the pantry
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item.name);
    await deleteDoc(docRef);
    await updatePantry(); // Refresh the pantry list
  };

  useEffect(() => {
    updatePantry(); // Call the function to fetch and log pantry items when the component mounts
  }, []); // Empty dependency array to ensure it runs only once

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f7f7f7"
      padding={4}
    >
      {/* Outer Stack for alignment */}
      <Stack width="800px" spacing={4} alignItems="center">
        {/* Title Section */}
        <Box border="1px solid #333">
          <Box
            width="800px"
            height="100px"
            bgcolor="#ADD8E6"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2" color="#333" textAlign="center">
              Pantry Items
            </Typography>
          </Box>
        </Box>

        {/* Search Section */}
        <Stack direction="row" spacing={2}>
          <TextField id="outlined-basic" label="Search" variant="outlined" />
          <Button variant="contained" onClick={handleOpen}>
            Add
          </Button>
        </Stack>

        {/* Pantry Items List */}
        <Stack
          width="800px"
          height="300px"
          spacing={2}
          overflow="auto"
          borderRadius={2}
          bgcolor="#ffffff"
          boxShadow={3}
        >
          {pantry.map((item) => (
            <Box
              key={item.name}
              width="100%"
              padding={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#e0f7fa"
              borderRadius={1}
            >
              <Typography
                variant="h5"
                color="#333"
                textAlign="center"
                fontWeight="500"
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)} -{" "}
                {item.count}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeItem(item)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* Modal Component */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          {/* Add form elements here to capture new item details */}
          <Button
            variant="contained"
            onClick={() => addItem({ name: "newItem", count: 1 })}
          >
            Add Item
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
