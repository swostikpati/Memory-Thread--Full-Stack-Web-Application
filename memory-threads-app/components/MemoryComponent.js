import Image from "next/image";
import styles from "./MemoryComponent.module.css";
function MemoryComponent({ memory, editHandler, deleteHandler }) {
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  }

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <p>{memory.title}</p>
        <div className={styles.buttons}>
          <button onClick={() => editHandler(memory)}>Edit</button>
          <button onClick={() => deleteHandler(memory._id)}>Delete</button>
        </div>
      </div>

      <p>{memory.content}</p>
      <p>A piece of media from today: {memory.specialLink}</p>
      {memory.image ? (
        <Image
          width={500}
          height={500}
          position="relative"
          src={memory.image}
          alt="Image"
        />
      ) : null}
      {/* remember to convert to Image tag from next/image */}
      <p>{formatDate(memory.dateCreated)}</p>
    </div>
  );
}

export default MemoryComponent;
