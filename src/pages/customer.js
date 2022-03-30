import React from 'react'
import axios from 'axios'
import {Modal, Button, Form} from "react-bootstrap"
import CustomerList from '../components/customerList';
import Navbar from '../components/navbar'

export default class Customer extends React.Component{
    constructor(){
        super()
        this.state = {
            customers:[],
            isModalOpen: false,
            name: "",
            phone: "",
            address:"",
            image: null,
            username: "",
            password: "",
            action: ""
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            phone: "",
            address:"",
            image: null,
            username: "",
            password: "",
            action: "insert"
        })
    }
    handleEdit = (selectedItem) =>{
        this.setState({
            isModalOpen: true,
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: "",
            action: "update"
        })
    }
    handleDelete = (customer_id) => {
        let url = "http://localhost:8080/store/customer/" + customer_id

        if (window.confirm('Anda yakin ingin menggapus data ini?')){
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleChange = (e) =>(
        this.setState({
            [e.target.name] : e.target.value
        })
    )
    handleFile = (e) =>{
        this.setState({
            image: e.target.files[0]
        })
    }
    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name",this.state.name)
        form.append("phone",this.state.phone)
        form.append("address",this.state.address)
        form.append("username",this.state.username)
        form.append("password",this.state.password)
        form.append("image",this.state.image)
        
        let url = ""
   
        if (this.state.action === "insert") {
            url = "http://localhost:8080/store/customer"

            axios.post(url, form)
            .then(res => {
                this.getCustomer()
               this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }
        else if (this.state.action === "update"){
            url = "http://localhost:8080/store/customer/" + this.state.customer_id

            axios.put(url, form)
            .then(res => {
                this.getCustomer()
               this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }

    }

    getCustomer = () => {
        let url = "http://localhost:8080/store/customer"

        axios.get(url)
        .then(res => {
            this.setState({
                customers: res.data.customer
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getCustomer()
    }
    render(){
        return(
            <div className='bg'>
                <Navbar />
                <div className='container-fluid'>
                    <div className='row'>

                    <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <div className="col-lg-12 col-sm-12 p-2">  
                                <div className='row'>
                                    <button className="col-3 btn btn-success my-1 mb-3" onClick={() => this.handleAdd()}>
                                        Tambah Customer
                                    </button>
                                    {this.state.customers.map((item,index)=>{
                                        return(
                                        <CustomerList
                                        key={index}
                                            nameimage={item.image}
                                            image={"http://localhost:8080/image/customer/" + item.image}
                                            name={item.name}
                                            phone={item.phone}
                                            address={item.address}
                                            onEdit={() => {this.handleEdit(item)}}
                                            onDrop={() => {this.handleDelete(item.customer_id)}}
                                        />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Form Customer</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="nama">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Masukan Nama"
                                                value={this.state.name} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telepon">
                                <Form.Label>Telepon</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Masukan Nomor telepon"
                                                value={this.state.phone} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="alamat">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="address" placeholder="Masukan Alamat"
                                                value={this.state.address} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Masukan username"
                                                value={this.state.username} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Masukan password"
                                                 onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="img">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="image" placeholder="Pilih Gambar anda" onChange={this.handleFile}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            </div>    
        )
    }
}