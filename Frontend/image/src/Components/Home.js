import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
const moment = require("moment");

export default function Home() {
  const [data, setData] = useState([]);
  console.log(data);


  useEffect(() => {
    getuserData();
  }, [])

  const getuserData = async () => {
    const res = await axios.get('http://localhost:5000/user/getuser/', {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.data.status === 500 || !res.data) {
      console.log("error");
    }
    else {
      setData(res.data.user)
    }
  }


  const deleteuser = async (id) => {
    console.log(id);

    const res = await axios.delete(`http://localhost:5000/user/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.data.status === 500 || !res.data) {
      console.log("error");
    }
    else {
      console.log("User Deleted Successfully");
      getuserData();
    }
  }

  return (
    <>
      <div className='container mt-2'>
        <h2 className='text-center'>MERN Image Upload Project</h2>
      </div>
      <div className='text-end bg-danger p-2'>
        <Link className='btn btn-light' to='/register'>Add User</Link>
      </div>
      <div className='container'>
        <div className=' row d-flex justify-content-between align-items-center'>
          {
            data.length > 0 ? data.map((element, index) => {
              console.log(`/upload/${element.imgpath}`);

              return (
                <React.Fragment key={index}>
                  <Card style={{ width: '18rem' }} className='bg-light mt-5 '>
                    <Card.Img variant="top" src={`http://localhost:5000/upload/${element.imgpath}`} />
                    <Card.Body className='text-center'>
                      <Card.Title>User Name: {element.name}</Card.Title>
                      <Card.Text>
                        Date: {moment(element.Date).format("L")}
                      </Card.Text>
                      <Button variant="danger" className='col-lg-6' onClick={() => deleteuser(element._id)} >Delete</Button>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              );
            }) : ""
          }
        </div>
      </div>
    </>
  )
}
