const Filter = ({ filter, handleNewFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleNewFilter} />
    </div>
  );
};

export default Filter;
