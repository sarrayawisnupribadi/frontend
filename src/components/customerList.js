import React from "react";

export default class CustomerList extends React.Component{
    render() {
        return(
            <div className="card col-sm12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        <img alt={this.props.namaimage} src={this.props.image}
                            className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7">
                        <h5 className="bold">Name : {this.props.name}</h5>
                        <h6>Phone : {this.props.phone}</h6>
                        <h6>Address : {this.props.address}</h6>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-primary" onClick={this.props.onEdit}>Edit</button>
                        <button className="btn btn-danger" onClick={this.props.onDrop}>Delete</button>   
                    </div>
                </div>
            </div>
        )
    }
}