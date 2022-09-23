import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteBrand, getBrand } from '../../axios/brandAxios';

const Brand = () => {
  const API_img = 'http://localhost:3000/uploads/';
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    getBrand((result) => setBrand(result));
  }, []);
  const deleteHandler = (id) => {
    deleteBrand(id);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100">
            <Link to="/brand/create" className="btn btn-sm btn-primary my-2">
              <span className="me-2">
                <FiPlusSquare></FiPlusSquare>
              </span>
              Tambah brand
            </Link>
          </div>
          <div className="w-100">
            <table className="table table-border">
              <thead>
                <tr className="table-primary">
                  <th>No</th>
                  <th>Nama Brand</th>
                  <th>Logo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {brand.length > 0 ? (
                  brand.map((brands, key) => {
                    const { id, nama, logo } = brands;
                    return (
                      <tr key={id}>
                        <td>{key + 1}</td>
                        <td>{nama}</td>
                        <td>
                          <img
                            alt="gambar"
                            src={logo ? API_img + logo : ''}
                            className="img-thumbnail"
                            width={logo ? '100' : 0}
                            height={logo ? '100' : 0}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/brand/edit/${id}`}
                            className="btn btn-sm btn-info"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteHandler(+id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <LoadingBar />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
