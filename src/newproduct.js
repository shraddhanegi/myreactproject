import { useState } from "react";

const Newproduct = () => {
  let [pname, setName] = useState("");
  let [pprice, setPrice] = useState("");
  let [purl, setUrl] = useState("");
  let [pdetails, setDetails] = useState("");

  const save = () => {
    let newItem = {
      Name: pname,
      Price: pprice,
      Image: purl,
      Details: pdetails,
    };
    let url = "http://localhost:1234/products";
    let postData = {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify(newItem),
    };
    fetch(url, postData)
      .then((response) => response.json())
      .then((data) => {
        alert("Product saved successfully!");
        clearAll(); 
      });
  };

  const clearAll = () => {
    setName("");
    setPrice("");
    setUrl("");
    setDetails("");
  };

  return (
    <section className="d-flex justify-content-center align-items-center mt-4">
      <div className="bg-white p-3" style={{ width: "900px" }}>
        <h1 className="bg-grey text-center mb-4">Enter Product Details</h1>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control  border-dark "
              onChange={(obj) => setName(obj.target.value)}
              value={pname}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Product Price</label>
            <input
              type="number"
              className="form-control  border-dark"
              onChange={(obj) => setPrice(obj.target.value)}
              value={pprice}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Product URL</label>
            <input
              type="text"
              className="form-control  border-dark"
              onChange={(obj) => setUrl(obj.target.value)}
              value={purl}
            />
          </div>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Product Details</label>
          <textarea
            rows={4}
            className="form-control  border-dark"
            onChange={(obj) => setDetails(obj.target.value)}
            value={pdetails}
          />
        </div>

       
        <div className="d-flex justify-content-center">
          <button className="btn btn-success me-2" onClick={save}>
            Save Product
          </button>
          <button className="btn btn-warning" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newproduct;