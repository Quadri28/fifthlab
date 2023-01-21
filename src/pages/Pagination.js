

import React,{useState, useEffect} from 'react'

const Pagination = ({  setCurrentPage, currentPage,}) => {
    
  return (
    <>
    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item btn">
      <a class="page-link text-dark" href="#" style={{borderRadius:'10px'}} aria-label="Previous" 
      onClick={()=>setCurrentPage(currentPage -1)}>
      <i className='bi bi-chevron-left'></i>
      </a>
    </li>
   
    <li class="page-item btn">
      <a class="page-link bg-dark text-white" style={{borderRadius:'10px'}} href="#" aria-label="Next"  
      onClick={()=>setCurrentPage(currentPage + 1)}>
        <i className='bi bi-chevron-right'></i>
      </a>
    </li>
  </ul>
</nav>
    </>
  )
}

export default Pagination