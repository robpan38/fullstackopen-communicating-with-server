const Notification = ({ message }) => {
  let styling = {
    color: "green",
    borderColor: "green",
    backgroundColor: "lightgrey",
    fontSize: 30,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) return null;
  if (message.includes("Information")) {
    styling = {
      ...styling,
      color: "red",
      borderColor: "red",
    };
  }
  return <div style={styling}>{message}</div>;
};

export default Notification;
