import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap'

export const EditStudent = () => {

  let params = useParams();
  let temp = {};
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);


  const updateData = (e) => {
    setUser((prev) => { return { ...prev, [e.target.name]: e.target.value } });
  }
  useEffect(() => {
    axios.get(`http://projectdb.in:8080/edit-student/${params.id}`).then((res) => {
      setUser(res.data);
    });
  }, []);
  const formSubmit = async (e) => {
    // e.preventDefault();

    try {
      axios.post("http://projectdb.in:8080/update-student", user).then((res) => {
        temp = res.data;
        setFlag(temp.success)
        console.log(temp)
      });
    } catch (error) {
      console.log(error)
    }
    return false
  }
  return (
    <Container>
      <h1>Edit Student</h1>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' defaultValue={user.name}
            onChange={updateData}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name='email' defaultValue={user.email}
            onChange={updateData}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control type="text" name='phone' defaultValue={user.phone}
            onChange={updateData}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" name='Address' defaultValue={user.address}
            onChange={updateData}
          />
        </Form.Group>
        {flag ? (<h1 style={{ color: 'green' }} >Success</h1>) : (<></>)}
        <Button type='submit' variant="success">Submit</Button>
        <Link to="/">
          <Button variant="primary" className='ms-2'>Back</Button>
        </Link>
      </Form>
    </Container>
  )
}
