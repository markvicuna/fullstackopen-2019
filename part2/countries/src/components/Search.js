import React from 'react'

const Search = ({ handleSearchChange, searchValue }) => {
    return (
      <div>
        find countries
          <input value={searchValue} onChange={handleSearchChange} />
      </div>
    )
  }

  export default Search