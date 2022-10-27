import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../Apis/Users'
import TableTemplateForCustomer from '../components/TableTemplateForCustomer'
import './AdminAllCustomers.css'

export default function AdminAllCustomers() {
  // ALL STATES 
  const [customers, setCustomers] = useState([])
  const [query, setQuery] = useState("")
  useEffect(() => {
    // GET ALL ORDERS
    getAllUsers().then(res => {
      setCustomers(res?.data?.user);
      console.log(res?.data?.user);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const handleSearchInput = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {

    getAllUsers().then(res => {
      setCustomers(res?.data?.user.filter(res => res.first_Name.toLowerCase().includes(query)));
      console.log(res?.data?.user);
    }).catch(err => {
      console.log(err);
    })

  }, [query])
  return (
    <div className="ListContainer">
      <div className='searchContainer'>
        <div><input onChange={(e) => { handleSearchInput(e) }} type="text" placeholder='Search by customer name' /></div>
      </div>
      <h1>All Customers</h1>

      <TableTemplateForCustomer
        columns={[
          { id: 'id', label: 'ID', minWidth: 170 },
          { id: 'first_Name', label: 'Name', minWidth: 170 },
          { id: 'email', label: 'Email', minWidth: 170 },
          { id: 'phone', label: 'Phone', minWidth: 170 },
        ]}
        rows={customers}
      />
    </div>
  )
}
