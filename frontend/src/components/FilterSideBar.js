



function FilterSideBar({ selectedCategory, setSelectedCategory, selectedPrice, setSelectedPrice }) {
  const categories = [
    { value: "", label: "All Categories" },
    { value: "men's clothing", label: "Men's Fashion" },
    { value: "women's clothing", label: "Women's Fashion" },
    { value: "electronics", label: "Electronics" },
    { value: "jewelery", label: "Jewelery" },
  ];

  const priceRanges = [
    { value: "", label: "All" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-150", label: "$100 - $150" },
    { value: "150+", label: "Above $150" },
  ];

  return (
    <div style={{ minWidth: '220px' }} className="bg-dark shadow-sm px-4 text-light">
      <h5 className="mt-4">Filter by Category</h5>
      <div>
        {categories.map(({ value, label }) => (
          <label key={value} style={{ display: 'block', marginBottom: '5px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="category"
              value={value}
              checked={selectedCategory === value}
              onChange={() => setSelectedCategory(value)}
              style={{ marginRight: '8px' }}
            />
            {label}
          </label>
        ))}
      </div>

      <h5 className="mt-4">Filter by Price</h5>
      <div>
        {priceRanges.map(({ value, label }) => (
          <label key={value} style={{ display: 'block', marginBottom: '5px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="price"
              value={value}
              checked={selectedPrice === value}
              onChange={() => setSelectedPrice(value)}
              style={{ marginRight: '8px' }}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterSideBar;
