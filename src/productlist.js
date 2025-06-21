import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Productlist = () => {

    let [itemList, setItemList] = useState([]);
    const getItem = async () => {
        try {
            await fetch("http://localhost:1234/products")
                .then(response => response.json())
                .then(itemArray => {
                    
                    if(porder==="asc"){
                        itemArray.sort((a, b)=>{ return a.Price - b.Price }); // asc order by price
                        setItemList(itemArray);
                        setPorder("desc");
                    }else{
                        itemArray.sort((a, b)=>{ return b.Price - a.Price }); // asc order by price
                        setItemList(itemArray);
                        setPorder("asc");
                    }

                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
    useEffect(() => {
        getItem();
    }, []);


    const del = (id) => {
        let url = "http://localhost:1234/products/" + id;
        let postData = { method: "delete" };
        fetch(url, postData)
            .then(response => response.json())
            .then(info => {
                alert(info.Name + "  delete succesfully !");
                getItem();

            })
    }

    let [keyword, setKeyword] = useState("");
    let [porder, setPorder] = useState("asc");

    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(itemList.length / PER_PAGE);

    // itemList.slice(offset, offset + PER_PAGE).map()
    //                 0   , 2
    //                 2,  , 4
    //                 4   , 6

    return (
        <section className="p-4 container">

            <div className="row mb-3">
                <div className="col-xl-9">  <h1 className="text-center">Product List</h1> </div>
                <div className="col-xl-3">
                    <input type="text" className="form-control" placeholder="Search.."
                        onChange={obj => setKeyword(obj.target.value)} />
                </div>
            </div>

            <table className="table table-bordered text-center align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>#ID </th>
                        <th>Product Name</th>
                        <th className="bg-warning" onClick={getItem}> Price </th>
                        <th>Details</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemList.slice(offset, offset + PER_PAGE).map((item, index)=>{
                            if( item.Name.toLowerCase().match( keyword.toLowerCase()) || item.Price.match(keyword) )
                            return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.Name}</td>
                                    <td>Rs.{item.Price}</td>
                                    <td>{item.Details}</td>
                                    <td>
                                        <img
                                            src={item.Image}
                                            alt={item.Name}
                                            width="50"
                                            height="40"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => del(item.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className="mb-4 mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>

        </section>
    );
}
export default Productlist;