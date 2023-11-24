// import styles from "./MemoryComponent.module.css";
function MemoryComponent({ memory }) {
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
    <div>
      <p>{memory.title}</p>
      <p>{memory.content}</p>
      <p>A piece of media from today: {memory.specialLink}</p>
      {memory.image ? <img src={memory.image} alt="Image" /> : null}
      {/* remember to convert to Image tag from next/image */}
      <p>{formatDate(memory.dateCreated)}</p>
    </div>
  );
}

export default MemoryComponent;
