import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ModalAddAddress({ show, handleClose, addNewAddress }) {
  const [cepComplete, setCepComplete] = useState();
  const [selectedPlanet, setSelectedPlanet] = useState("Terra");
  const inputName = useRef();
  const inputCep = useRef();
  const inputStreet = useRef();
  const inputNumber = useRef();
  const inputDistrict = useRef();
  const inputCity = useRef();
  const inputUf = useRef();
  const inputPlanet = useRef();

  //----------------------------------ADICIONAR ENDEREÇO----------------------------------
  async function addAddress() {
    try {
      const { data: newAddress } = await axios.post(
        "https://space-x-api.vercel.app/addresses",
        {
          name: inputName.current.value,
          cep: inputCep.current.value,
          street: inputStreet.current.value,
          number: inputNumber.current.value,
          district: inputDistrict.current.value,
          city: inputCity.current.value,
          uf: inputUf.current.value,
          planet: inputPlanet.current.value,
        }
      );
      addNewAddress(newAddress);
      handleClose();
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
    }
  }

  const checkCep = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      setCepComplete(data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  useEffect(() => {
    if (cepComplete) {
      inputStreet.current.value = cepComplete.logradouro || "";
      inputDistrict.current.value = cepComplete.bairro || "";
      inputCity.current.value = cepComplete.localidade || "";
      inputUf.current.value = cepComplete.uf || "";
    }
  }, [cepComplete]);

  const handlePlanetChange = (e) => {
    setSelectedPlanet(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text display-5"> + Novo Endereço</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Planeta
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              ref={inputPlanet}
              onChange={handlePlanetChange}
              autoFocus
            >
              <option value="Terra">Terra</option>
              <option value="Marte">Marte</option>
            </select>
          </Form.Group>

          <div className="row mb-3">
            <Form.Group className="col-8" controlId="nameForm">
              <Form.Label>
                <strong>Nome</strong>
              </Form.Label>
              <Form.Control ref={inputName} type="text" placeholder="Nome" />
            </Form.Group>

            <Form.Group className="col-4" controlId="cepForm">
              <Form.Label>
                <strong>CEP</strong>
              </Form.Label>
              <Form.Control
                onBlur={checkCep}
                ref={inputCep}
                type="text"
                placeholder="CEP"
                disabled={selectedPlanet === "Marte"}
              />
            </Form.Group>
          </div>

          <div className="row mb-3">
            <Form.Group className="col-8" controlId="streetForm">
              <Form.Label>
                <strong>Rua</strong>
              </Form.Label>
              <Form.Control
                ref={inputStreet}
                type="text"
                placeholder="Rua"
                disabled={selectedPlanet === "Marte"}
              />
            </Form.Group>

            <Form.Group className="col-4" controlId="numberForm">
              <Form.Label>
                <strong>Número</strong>
              </Form.Label>
              <Form.Control ref={inputNumber} type="text" placeholder="Número" />
            </Form.Group>
          </div>

          <Form.Group className="col-12" controlId="districtForm">
            <Form.Label>
              <strong>Bairro</strong>
            </Form.Label>
            <Form.Control
              ref={inputDistrict}
              type="text"
              placeholder="Bairro"
              disabled={selectedPlanet === "Marte"}
            />
          </Form.Group>

          <div className="row mb-3">
            <Form.Group className="col-8" controlId="cityForm">
              <Form.Label>
                <strong>Cidade</strong>
              </Form.Label>
              <Form.Control
                ref={inputCity}
                type="text"
                placeholder="Cidade"
                disabled={selectedPlanet === "Marte"}
              />
            </Form.Group>

            <Form.Group className="col-4" controlId="ufForm">
              <Form.Label>
                <strong>UF</strong>
              </Form.Label>
              <Form.Control
                ref={inputUf}
                type="text"
                placeholder="UF"
                disabled={selectedPlanet === "Marte"}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Sair
        </Button>
        <Button variant="primary" onClick={addAddress}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddAddress;
