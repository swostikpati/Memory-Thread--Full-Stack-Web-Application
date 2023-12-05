"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import MemoryComponent from "@/components/MemoryComponent";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const delMemoryId = useRef(null);
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Send the user data to the server
      const createUser = async () => {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log(response);
      };
      createUser();
    }
  }, [isLoaded, user, isSignedIn]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/journalEntries");
      const data = await response.json();
      setJournalEntries(data);
    };
    fetchData();
  }, [fetchTrigger]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (isEditing) {
      setIsEditing(false);
      setCurrentMemory(null);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title: event.target.title.value,
      content: event.target.content.value,
      specialLink: event.target.specialLink.value,
      image: event.target.image.value,
    };

    try {
      const response = isEditing
        ? await fetch(`/api/journalEntries/${currentMemory._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
        : await fetch("/api/journalEntries", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

      // Handle response accordingly
      console.log(response.data);
      togglePopup();
      setFetchTrigger(!fetchTrigger);
    } catch (error) {
      console.error("Error submitting memory:", error);
    }
  };

  function editHandler(memory) {
    console.log(memory.title);
    setCurrentMemory(memory);
    setIsEditing(true);
    setShowPopup(true);
  }

  function deleteHandler(memoryId) {
    // Delete logic (to be implemented)
    console.log("Delete memory", memoryId);
    setShowDeletePopup(true);
    delMemoryId.current = memoryId;
  }

  async function confirmDeleteHandler() {
    //make a delete request to the server
    const response = await fetch(`/api/journalEntries/${delMemoryId.current}`, {
      method: "DELETE",
    });
    console.log(response);
    setShowDeletePopup(false);
    setFetchTrigger(!fetchTrigger);
  }

  // Function to update the selected date
  const handleDateChange = (event) => {
    // Convert the selected date to the beginning of the day in UTC
    if (event.target.value === "") {
      setSelectedDate("");
      return;
    }
    const userDate = new Date(event.target.value);
    userDate.setMinutes(userDate.getMinutes() + userDate.getTimezoneOffset());
    setSelectedDate(userDate.toISOString().split("T")[0]);
  };

  const formatDate = (dateString) => {
    // Convert and format the date in UTC
    const date = new Date(dateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  // Apply the date filter to journalEntries
  const filteredEntries = journalEntries.filter((entry) => {
    // If no date is selected, return all entries
    if (selectedDate === "") {
      return true;
    }
    // Else, return entries that match the selected date
    return formatDate(entry.dateCreated) === selectedDate;
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p>Timeline of Moments</p>
        <button
          className={styles.createMemoryBtn}
          onClick={() => togglePopup()}
        >
          CREATE MEMORY
        </button>
      </header>
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.formHeader}>
              <p>Capture a Moment</p>
              <img
                src="cross1.png"
                onClick={togglePopup}
                className={styles.closeButton}
              ></img>
            </div>

            <form onSubmit={handleFormSubmit} className={styles.addEditForm}>
              <label className={styles.title}>
                <em>Caption This Day: (Heading):</em>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={isEditing ? currentMemory.title : ""}
                />
              </label>
              <label className={styles.content}>
                <em>Chronicle Your Unforgettable Moment:</em>
                <textarea
                  name="content"
                  required
                  defaultValue={isEditing ? currentMemory.content : ""}
                />
              </label>
              <label className={styles.link}>
                <em>Post Today&apos;s Highlight (Music/Movie/Show/Book):</em>
                <input
                  type="text"
                  name="specialLink"
                  defaultValue={isEditing ? currentMemory.specialLink : ""}
                />
              </label>
              <label className={styles.photo}>
                <em>Upload a Photo to Treasure (URL):</em>
                <input
                  type="text"
                  name="image"
                  defaultValue={isEditing ? currentMemory.image : ""}
                />
              </label>
              <div>
                <button type="submit" className={styles.formSubmitBt}>
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.delPopup}>
            <p>Are you sure you want to delete this memory?</p>
            <div>
              <button
                onClick={confirmDeleteHandler}
                className={styles.delYesBt}
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className={styles.delNoBt}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Date Selector */}
      {/* <div>
        <button onClick={() => setSelectedDate("")}>Clear</button>
      </div> */}
      <label htmlFor="dateInput" className={styles.dateLabel}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.dateInput}
        />
      </label>

      <section className={styles.displayMemories}>
        {filteredEntries.map((entry, index) => (
          <MemoryComponent
            key={index}
            memory={entry}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </section>
    </main>
  );
}
