"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import MemoryComponent from "@/components/MemoryComponent";

export default function Page() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/journalEntries");
      const data = await response.json();
      setJournalEntries(data);
    };

    fetchData();
  }, [fetchTrigger]);

  const createMemoryButtonHandler = () => {
    setShowPopup(true);
  };

  const closePopupHandler = () => {
    setShowPopup(false);
  };

  const addMemory = async (event) => {
    event.preventDefault();

    const formData = {
      title: event.target.title.value,
      content: event.target.content.value,
      specialLink: event.target.specialLink.value,
      image: event.target.image.value,
    };

    try {
      const response = await fetch("/api/journalEntries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response.data); // Handle the response accordingly

      setFetchTrigger(!fetchTrigger);
      // Close the popup and optionally refresh the entries
      closePopupHandler();
      // Consider re-fetching the entries here to update the list
    } catch (error) {
      console.error("Error submitting memory:", error);
      // Handle error accordingly
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p>Timeline of Moments</p>
        <button
          className={styles.createMemoryBtn}
          onClick={createMemoryButtonHandler}
        >
          CREATE MEMORY
        </button>
      </header>
      {showPopup && (
        <div className={styles.popup}>
          <button onClick={closePopupHandler} className={styles.closeButton}>
            X
          </button>
          <form onSubmit={addMemory}>
            <label>
              Summarize today in a few words (Heading):
              <input type="text" name="title" />
            </label>
            <label>
              What memory do you want to preserve from today?
              <textarea name="content" />
            </label>
            <label>
              Share a special piece of media from today:
              <input type="text" name="specialLink" />
            </label>
            <label>
              Attach a photo you want to remember (URL for now):
              <input type="text" name="image" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <section className={styles.displayMemories}>
        {journalEntries.map((entry, index) => (
          <MemoryComponent key={index} memory={entry} />
        ))}
      </section>
    </main>
  );
}
