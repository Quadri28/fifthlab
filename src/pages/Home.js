
import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import Pagination from './Pagination'
import Select from 'react-select'
import Switch from 'react-switch'
import countryList from 'react-select-country-list'
import './Home.css'
import { FaFemale, FaMale, FaUsers } from "react-icons/fa"
import { BsCloudDownload } from 'react-icons/bs'
import { Link } from 'react-router-dom';


const Home = () => {
  const [users, setUsers] = useState([])
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  const showHandler =()=>{
   console.log(show)
    setShow(!show)
  }

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(3)

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecord = users.slice(indexOfFirstRecord, indexOfLastRecord)

  const handleSearch = (e) => {
    setSearch(e.target.value)

  }
  const filteredSearch = !search ? currentRecord : currentRecord.filter(users => users.gender.toLowerCase() === search.toLowerCase())


  useEffect(() => {

    axios.get('https://randomuser.me/api/?results=20')
      .then(resp => {
        console.log(resp)
        setUsers(resp.data.results)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <div className='wrapper row gap-3 g-3 py-5 justify-content-center'>

      <div className='col-md-4 mx-auto mt-4 px-3'>
        <p className='text-white mb-4'>Hello <b style={{ fontWeight: '700' }}>Emerald </b></p>
        <span style={{ fontSize: '12px', color:'#a0a0a0' }} >
          Welcome to your dashboard, kindly sort through the user base
        </span>
        <div style={{ position: 'relative', marginTop: '1rem' }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: '10px', top: '22px' }}></i>
          <input type='text' className='w-100 px-4' placeholder='find a user'
            style={{ height: '4rem', borderRadius: '1em', backgroundColor: '#ededed' }} value={search} onChange={(e) => handleSearch(e)} />
        </div>

        <div className='mt-5'>
          <p className='text-white'>Show users</p>
        <div className="d-sm-flex gap-5 g-3 mt-4">
          <div className='text-white col-sm-3 text-center'>
            <button className="btn bnt-lg w-100" style={{
              height: '4rem', backgroundColor: '#f935a9',
              color: '#fff', borderRadius:'1rem', height:'6rem'
            }}
              onClick={() => setSearch('')}><FaUsers style={{fontSize:'25px'}} /></button>
            <p style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '.7rem' }}>All Users</p>
          </div>

          <div className='col-sm-3 text-center text-white'>
            <button className="btn bnt-lg w-100" style={{ height: '4rem', backgroundColor: '#30bbb5',
             color: '#fff', borderRadius:'1rem', height:'6rem' }}
              onClick={() => setSearch('male')}><FaMale style={{fontSize:'25px'}}/>
            </button>
            <p style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '.7rem' }}>Male Users</p>
          </div>
          <div className='col-sm-3 text-center text-white'>
            <button className="btn bnt-lg w-100" style={{ height: '4rem', backgroundColor: '#7946c1', 
            color: '#fff', borderRadius:'1rem', height:'6rem' }}
              onClick={() => setSearch('female')}><FaFemale style={{fontSize:'25px'}}/>
            </button>
            <p style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '.7rem' }}>Female Users</p>
          </div>
        </div>
        </div>

      </div>
      <div className='col-md-7 px-4 py-4 mx-auto' style={{ backgroundColor: '#ededed', borderRadius: '20px' }}>
        <h2 className='text-dark'>All Users</h2>
        <span style={{ fontSize: '14px', marginBottom: '1rem' }}>Filter by</span>

        <div className='row gap-3 g-3 mb-3'>
          <div style={{ position: 'relative', marginTop: '1rem' }} className='col-sm-5'>
            <i className="bi bi-search" style={{ position: 'absolute', left: '15px', top: '22px' }}></i>
            <input type='text' className='w-100 px-4' placeholder='Find in list'
              style={{ height: '4rem', borderRadius: '2rem', backgroundColor: '#ededed' }} value={search} onChange={(e) => handleSearch(e)} />
          </div>
            <div style={{ height: '4rem', borderRadius: '2rem' }} 
            className="col-sm-5 d-flex align-items-center gap-3 g-3 justify-content-between">
          <Select options={options} value={value} onChange={changeHandler}  className="col-8"/>
          <div className='col-3 d-flex gap-2 align-items-center'>
          <Switch onChange={showHandler} checked={show}/>
          Show country
          </div>
          </div>
        </div>
        {filteredSearch.map(user => (
          <div key={user.name.first} className='d-flex flex-column card mt-3 p-3'>
            <div className='row gap-3 g-3'>
              <img src={user.picture.medium} className='col-sm-4' alt='avatar' style={{
                width: '5rem', height: '5rem',
                backgroundColor: ' #30bbb5', borderRadius: '50%'
              }} />
              <div className='col-md-8'>
                <h3 style={{ fontWeight: 700 }}>{user.name.first}</h3>
                <p style={{ fontStyle: 'italic' }}>{user.location.street.number}, 
                {user.location.street.name} {user.location.city},  
                
                 { !show ?
                  <span style={{marginLeft:'2px'}}>
                {user.location.country}</span> : ''
                }
                </p>
                <div className='row gap-2 g-2 align-items-center justify-content-between'>
                  <span style={{ fontSize: '13px' }} className='col-sm-6' >
                    <i className="bi bi-envelope"></i>  {user.email}</span>
                  <span style={{ fontSize: '13px' }} className='col-sm-3'> 
                  <i className='bi bi-telephone-plus'></i> {user.phone}</span> 
                  <a href={''} className='text-white col-sm-2 text-center'
                   style={{backgroundColor:'#30bbb5', borderRadius:'.5rem', padding:'.5rem'}}> 
                  <i className='bi bi-arrow-right'></i> </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='d-sm-flex justify-content-between mt-4 gap-3 g-3'>

          <a type='button' href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(currentRecord)
          )}`}
            download="users.json"
           className='col-sm-4  btn btn-lg align-items-center mb-3'
            style={{
              textDecoration: 'none', color: '#fff',
              backgroundColor: '#7946c1',
              borderRadius:'3rem', 
              fontSize:'14px',
              padding:'auto 0'
            }}>
            <BsCloudDownload /> Download Results
          </a>

          <div className='col-5'>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home