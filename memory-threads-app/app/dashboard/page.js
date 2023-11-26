"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import MemoryComponent from "@/components/MemoryComponent";

export default function Page() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

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
      console.log(currentMemory._id);
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

  const deleteHandler = (memoryId) => {
    // Delete logic (to be implemented)
    console.log("Delete memory", memoryId);
  };

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
        <div className={styles.popup}>
          <button onClick={togglePopup} className={styles.closeButton}>
            X
          </button>
          <form onSubmit={handleFormSubmit}>
            <label>
              Summarize today in a few words (Heading):
              <input
                type="text"
                name="title"
                defaultValue={isEditing ? currentMemory.title : ""}
              />
            </label>
            <label>
              What memory do you want to preserve from today?
              <textarea
                name="content"
                defaultValue={isEditing ? currentMemory.content : ""}
              />
            </label>
            <label>
              Share a special piece of media from today:
              <input
                type="text"
                name="specialLink"
                defaultValue={isEditing ? currentMemory.specialLink : ""}
              />
            </label>
            <label>
              Attach a photo you want to remember (URL for now):
              <input
                type="text"
                name="image"
                defaultValue={isEditing ? currentMemory.image : ""}
              />
            </label>
            <button type="submit">{isEditing ? "Update" : "Submit"}</button>
          </form>
        </div>
      )}
      <section className={styles.displayMemories}>
        {journalEntries.map((entry, index) => (
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
