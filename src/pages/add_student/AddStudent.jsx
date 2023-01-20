import { Form, Container, Button } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

export const AddStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })
  const [flag, setFlag] = useState(false);
  const onSubmit = (e) => {
    let temp = {};
    try {
      axios.post("http://projectdb.in:8080/save-student", details).then((res) => {
        temp = res.data;
        setFlag(temp.success)
      });
    } catch (error) {
      console.log(error)
      return false
    }
    console.log("Success")
    return false

  };
  const detailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }
  return (
    <Container className='mt-4'>
      <h1>Add Student</h1>
      <Form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' placeholder="Enter Name" value={details.name} {...register("name", { required: true })} onChange={(e) => detailsChange(e)} />
        </Form.Group>
        {errors.name && <p style={{ color: "red" }}>Name is required</p>}
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" name='email' placeholder="Enter email" value={details.email} {...register("email", { required: true })} onChange={(e) => detailsChange(e)} />
        </Form.Group>
        {errors.email && <p style={{ color: "red" }}>email is required</p>}
        <Form.Group className="mb-3" >
          <Form.Label>Phone no.</Form.Label>
          <Form.Control type="text" name='phone' placeholder="Enter Phone no" value={details.phone} {...register("phone", { required: true })} onChange={(e) => detailsChange(e)} />
        </Form.Group>
        {errors.phone && <p style={{ color: "red" }}>phone is required</p>}
        <Form.Group className="mb-3" >
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" name='address' placeholder='Enter Address' value={details.address} {...register("address", { required: true })} onChange={(e) => detailsChange(e)} />
        </Form.Group>
        {errors.address && <p style={{ color: "red" }}>address is required</p>}
        {flag ? (<h1 style={{ color: 'green' }} >Success</h1>) : (<></>)}
        <Button variant="success" type="submit"
        >
          Submit
        </Button>
        <Link to="/">
          <Button variant="primary" className='ms-2'>Back</Button>
        </Link>
      </Form>
    </Container>
  )
}
