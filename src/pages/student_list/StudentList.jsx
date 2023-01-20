import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchApiData();

  }, []);
  const fetchApiData = async () => {
    try {
      axios.get("http://projectdb.in:8080/stud-list").then((res) => {
        setPosts(res.data);
        console.log(posts)
      });

    } catch (error) {
      console.log(error);
    }
  };
  const handleDetete = async (id) => {
    try {
      await fetch(`http://projectdb.in:8080/delete-student/${id}`).then((res) => {
        return res.json();
      });
    } catch (error) {
      console.log(error);
    }
    fetchApiData();
  };

  console.log('post', posts);
  return (
    <>
      <Container className='mt-4'>
        <h1>Student List</h1>
        <Link to="/add-update">
          <Button variant="primary" className='mb-3'>Add Student</Button>
        </Link>
        <Table responsive striped bordered hover size="sm">
          <thead >
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key+1}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>{val.address}</td>
                  <td className='text-center'>
                    <Link to={`/add-update/${val.id}`}>
                      <button className="btn btn-primary" style={{ width: '100%' }}>Edit</button>
                    </Link>
                  </td>
                  <td className='me-0'>
                    <button className="btn btn-danger" style={{ width: '100%' }}
                      onClick={() => handleDetete(val.id)}
                    > Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}
export default StudentList;
