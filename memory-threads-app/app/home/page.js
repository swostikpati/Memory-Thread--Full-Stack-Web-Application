"use client";
import { useState } from "react";
export default function page() {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    specialLink: "",
    image: "", // This will be a string for now
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("./api/journalEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const data = await response.json();
    if (data.message === "Journal entry created") {
      console.log("success");
      // Handle success
    } else {
      // Handle error
      console.log("error");
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Summarize today in a few words:
          <input
            type="text"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          />
        </label>
        <label>
          What memory do you want to preserve from today?
          <textarea
            value={formState.content}
            onChange={(e) =>
              setFormState({ ...formState, content: e.target.value })
            }
          />
        </label>
        <label>
          Share a special piece of media from today:
          <input
            type="text"
            value={formState.specialLink}
            onChange={(e) =>
              setFormState({ ...formState, specialLink: e.target.value })
            }
          />
        </label>
        <label>
          Attach a photo you want to remember (URL for now):
          <input
            type="text"
            value={formState.image}
            onChange={(e) =>
              setFormState({ ...formState, image: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
