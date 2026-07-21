const SearchBar = ({
  search,
  setSearch,
  location,
  setLocation,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">

      <input
        type="text"
        placeholder="Search by Job Title..."
        className="border rounded-lg p-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="text"
        placeholder="Search by Location..."
        className="border rounded-lg p-3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

    </div>
  );
};

export default SearchBar;