type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};
const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Posts..."
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default PostFilter;
