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

      <p className={styles.content}>{memory.content}</p>

      {memory.specialLink ? (
        <div className={styles.specialLinkDiv}>
          <a
            href={memory.specialLink}
            className={styles.specialLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            Today&apos;s Highlight :)
          </a>
        </div>
      ) : null}

      {memory.image ? (
        <img
          width={350}
          height={350}
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
