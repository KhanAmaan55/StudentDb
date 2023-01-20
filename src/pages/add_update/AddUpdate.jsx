import { Form, Container, Button, Alert } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

import axios from 'axios';

export const AddUpdateStudent = () => {
    let params = useParams();
    let temp = {};
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [details, setDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if (params.id) {
            axios.get(`http://projectdb.in:8080/edit-student/${params.id}`).then((res) => {
                setDetails(res.data);
            });
        }
    }, []);
    const formSubmit = (e) => {
        // e.preventDefault()
        if (params.id) {
            try {
                axios.post("http://projectdb.in:8080/update-student", details).then((res) => {
                    temp = res.data;
                    setFlag(temp.success)
                    console.log(temp)
                });
            } catch (error) {
                console.log(error)
            }
            return false
        } else {
            try {
                axios.post("http://projectdb.in:8080/save-student", details).then((res) => {
                    temp = res.data;
                    console.log(temp)
                    setFlag(temp.success)
                });
            } catch (error) {
                console.log(error)
                return false
            }
            console.log("Success")
            return false

        };

    }
    const detailsChange = (e) => {
        setDetails((prev) => { return { ...prev, [e.target.name]: e.target.value } });
    }
    return (
        <Container className='mt-4'>

            {params.id ? (<h1>Edit Student</h1>) : (<h1>Add Student</h1>)}
            <Form onSubmit={handleSubmit(formSubmit)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter Name"
                        // value={details.name}
                        defaultValue={details.name}
                        {...register("name", { required: true })}
                        onChange={(e) => detailsChange(e)} 
                        />
                </Form.Group>
                {errors.name && <p style={{ color: "red" }}>name is required</p>}
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name='email' placeholder="Enter email"
                    // value={details.email}
                    defaultValue={details.email}
                    {...register("email", { required: true })}
                    onChange={(e) => detailsChange(e)}
                     />
            </Form.Group>
            {errors.email && <p style={{ color: "red" }}>Name is required</p>}

            <Form.Group className="mb-3" >
                <Form.Label>Phone no.</Form.Label>
                <Form.Control type="text" name='phone' placeholder="Enter Phone no"
                    // value={details.phone}
                    defaultValue={details.phone}
                    {...register("phone", { required: true })}
                    onChange={(e) => detailsChange(e)} 
                    />
            </Form.Group>
            {errors.phone && <p style={{ color: "red" }}>Name is required</p>}

            <Form.Group className="mb-3" >
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" name='address'
                    placeholder='Enter Address'
                    // value={details.address}
                    defaultValue={details.address}
                    {...register("address", { required: true })}
                    onChange={(e) => detailsChange(e)} 
                    />
            </Form.Group>
            {errors.address && <p style={{ color: "red" }}>Name is required</p>}

            {flag ? (<Alert key="success" variant="success">Success</Alert>) : (<></>)}
            <Button variant="success" type="submit"
            >
                Submit
            </Button>
            <Link to="/">
                <Button variant="primary" className='ms-2'>Back</Button>
            </Link>
        </Form>
        </Container >
    )
}
