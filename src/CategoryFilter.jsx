import React from 'react';
import { useGlobalContext } from './context';

function CategoryFilter() {
  const { categories, selectedCategories, setSelectedCategories } = useGlobalContext();

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(category => category !== value)
    );
  };

  return (
    <section className='category-filter'>
      <h2>Filter by Category</h2>
      <div className='filter-options'>
        {categories.map(category => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            {category}
          </label>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
