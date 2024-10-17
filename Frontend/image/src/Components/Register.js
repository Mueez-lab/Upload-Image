import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const history = useNavigate();

  const [name,setName] = useState("");
  const [file,setFile] = useState("");

  console.log(name);
  console.log(file);
  
  

  const setData =(e)=>{
    const value =  e.target.value;
    setName(value);
  }

  const setImage =(e)=>{
    setFile(e.target.files[0])
  }


  const submit =async (e)=>{
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name",name)
    formdata.append("photo",file)

    const config = {
      "Content-Type": "multipart/form-data"
    }
    const res = await axios.post('http://localhost:5000/user/register/',formdata,config)
    if(res.data.status === 500|| !res.data)
    {
      console.log("error");
    }
    else{
      history('/')
    }
  }

  return (
    <>
      <div className='container mt-5'>
        <h1>Upload Your Image Here</h1>

        <Form className='mt-5'>
          <Form.Group as={Row}  className="mb-4" controlId="text">
            <Form.Label>
              User Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" name='name' onChange={setData} placeholder="Enter user name" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-5" controlId="Image">
            <Form.Label>
              Select Your Image
            </Form.Label>
            <Col sm="10">
              <Form.Control type="file" name="file" onChange={setImage} placeholder="Choose File" />
            </Col>
          </Form.Group>
          <Button variant="success" onClick={submit}>Submit</Button>
        </Form>
      </div>
    </>
  )
}
