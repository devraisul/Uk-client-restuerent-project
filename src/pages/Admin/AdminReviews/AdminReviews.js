import React, { useEffect, useState } from 'react'
import TableTemplateForRestaurants from '../components/TableTemplateForRestaurants'
import './AdminReviews.css'

export default function AdminReviews() {
  // ALL STATES 
  const [reviews, setCustomers] = useState([
    {id:1,name:'Velly of Icecream',rating:7},
    {id:2,name:'Test Rest',rating:2},
    {id:3,name:'Test 123',rating:5},
  ])
  const [query, setQuery] = useState("")
  useEffect(() => {
    // GET ALL ORDERS
    // getAllUsers().then(res => {
    //   setCustomers(res?.data?.user);
    //   console.log(res?.data?.user);
    // }).catch(err => {
    //   console.log(err);
    // })
  }, [])

  const handleSearchInput = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {

    // getAllUsers().then(res => {
    //   setCustomers(res?.data?.user.filter(res => res.first_Name.toLowerCase().includes(query)));
    //   console.log(res?.data?.user);
    // }).catch(err => {
    //   console.log(err);
    // })

  }, [query])
  return (
    <div className="ListContainer">
      <div className='searchContainer'>
        <div><input onChange={(e) => { handleSearchInput(e) }} type="text" placeholder='Search by customer name' /></div>
      </div>
      <h1>All Reviews</h1>

      <TableTemplateForRestaurants
        columns={[
          { id: 'id', label: 'ID', minWidth: 10 },
          { id: 'name', label: 'Restaurant Name', minWidth: 170 },
          { id: 'rating', label: 'Total Ratings', minWidth: 60 },
        ]}
        rows={reviews}
      />
    </div>
  )
}
