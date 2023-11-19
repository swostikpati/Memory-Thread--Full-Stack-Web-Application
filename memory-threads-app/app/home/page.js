import JournalEntry from "@models/JournalEntryModel.js";
import dbConnect from "@lib/dbConnect.js";

export default function page() {
  // const [formState, setFormState] = useState({
  //   title: "",
  //   content: "",
  //   specialLink: "",
  //   image: "", // This will be a string for now
  // });

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await fetch("./api/journalEntries", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formState),
  //   });

  //   const data = await response.json();
  //   if (data.message === "Journal entry created") {
  //     console.log("success");
  //     // Handle success
  //   } else {
  //     // Handle error
  //     console.log("error");
  //   }
  // };

  const addMemory = async (FormData) => {
    "use server";
    const title = FormData.get("title");
    const content = FormData.get("content");
    const specialLink = FormData.get("specialLink");
    const image = FormData.get("image");

    await dbConnect();
    await JournalEntry.create({ title, content, specialLink, image });
    console.log("Journal entry created", title, content, specialLink, image);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form action={addMemory}>
        <label>
          Summarize today in a few words:
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
  );
}
