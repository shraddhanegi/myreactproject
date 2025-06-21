
import { useState } from "react";

const MyLoginOLd = ()=>{

    return(
        <section className="container">
            <div className="row mt-5">
                <h5 className="text-center"> Enter Login Details </h5>
            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-xl-4">
                    <div className="card shadow-lg">
                        <div class="card-header bg-danger text-white"> <i className="fa fa-lock"> </i> Login</div> 
                        <div className="card-body">
                            <label className="mb-4"> E-mail Id </label>
                            <input type="email" className="form-control mb-4" placeholder="enter email id"/>
                            <label className="mb-4"> Password </label>
                            <input type="password" className="form-control mb-4" placeholder="enter password"/>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-info bg-gray ">  Login <i className="fa fa-arrow-right"> </i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyLoginOLD;