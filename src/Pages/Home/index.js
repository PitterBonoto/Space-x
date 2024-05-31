import React, { useState, useEffect } from "react";
import ModalAddAddress from "../../Components/modalAddAddress";
import Button from "react-bootstrap/Button";
import Address from "../../Components/card1";
import axios from "axios";
import SpaceX from "../../Assets/space-x.png"

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [address, setAddress] = useState([]);

  //----------------------------------PEGAR ENDEREÇOS----------------------------------
  /*async function getAddress() {
    const { data: listAddress } = await axios.get(
      "http://localhost:3001/addresses"
    );
    setAddress(listAddress);
  }*/

  useEffect(() => {
    async function fetchUsers() {
      const { data: listAddress } = await axios.get(
        "http://localhost:3001/addresses"
      );
      setAddress(listAddress);
    }
    fetchUsers();
  }, []);

  const addNewAddress = (newAddress) => {
    setAddress([...address, newAddress]);
  };

  const removeAddress = (id) => {
    setAddress(address.filter((addr) => addr.id !== id));
  };

  return (
    <>
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col d-flex align-items-center justify-content-between mt-4 mx-md-5">
              <h1 className="text display-3 ms-md-5">Endereços</h1>
              <img src={SpaceX} alt="logo" className="img me-md-5" style={{width: "15vh"}} />
            </div>
          </div>

          <div className="container">
            <div className="container">
              <div className="row mt-4">
                <Button
                  onClick={handleShow}
                  className=" col-md-6 mx-auto btn btn-light mb-4"
                >
                  + Novo Endereço
                </Button>
              </div>
            </div>
          </div>

          <div className="row">
            <ul className="col-md-6 mx-auto">
              {address.map((address) => (
                <Address
                  value={address}
                  key={address.id}
                  removeAddress={removeAddress}
                >
                  {address}
                </Address>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ModalAddAddress
        show={show}
        handleClose={handleClose}
        addNewAddress={addNewAddress}
      />
    </>
  );
}

export default App;
