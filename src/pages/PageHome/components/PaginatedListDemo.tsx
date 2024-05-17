import { Fragment, useState } from 'react'

/* ========================================================================
                          
======================================================================== */

export const PaginatedListDemo = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const namesPerPage = 10

  // Generate an array of 50 names (for demonstration purposes)
  const allNames = Array.from({ length: 50 }, (_, index) => `Name ${index + 1}`)

  // Calculate the indexes for the current page
  const indexOfLastName = currentPage * namesPerPage
  const indexOfFirstName = indexOfLastName - namesPerPage
  const currentNames = allNames.slice(indexOfFirstName, indexOfLastName)

  // Function to handle page change
  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  /* ======================
          return
  ====================== */

  return (
    <Fragment>
      <div className='p-4'>
        <h1 className='mb-4 text-2xl font-bold'>Paginated List of Names</h1>
        <ul className='rounded border bg-white'>
          {currentNames.map((name, index) => (
            <li key={index} className='border p-2'>
              {name}
            </li>
          ))}
        </ul>
        <div className='mt-4'>
          {Array.from(
            { length: Math.ceil(allNames.length / namesPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none 
            ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </Fragment>
  )
}
