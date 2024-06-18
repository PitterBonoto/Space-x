import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SpaceX from "../../Assets/space-x.png";

function EditAddress() {
  const { id } = useParams();
  const [address, setAddress] = useState();
  const inputName = useRef();
  const inputCep = useRef();
  const inputStreet = useRef();
  const inputNumber = useRef();
  const inputDistrict = useRef();
  const inputCity = useRef();
  const inputUf = useRef();
  const inputPlanet = useRef();

  useEffect(() => {
    async function fetchUsers() {
      const { data: myAddress } = await axios.get(
        `https://space-x-api.vercel.app/addresses/${id}`
      );
      setAddress(myAddress);
    }
    fetchUsers();
  }, [id]);

  useEffect(() => {
    if (address) {
      inputName.current.value = address.name;
      inputCep.current.value = address.cep;
      inputStreet.current.value = address.street;
      inputNumber.current.value = address.number;
      inputDistrict.current.value = address.district;
      inputCity.current.value = address.city;
      inputUf.current.value = address.uf;
      inputPlanet.current.value = address.planet;
    }
  }, [address]);

  async function saveEditAddress() {
    const { data: newAddress } = await axios.put(
      `https://space-x-api.vercel.app/addresses/${id}`,
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
    setAddress(newAddress);
  }

  const navigate = useNavigate();
  function fromHome() {
    navigate("/");
  }

  function save() {
    saveEditAddress();
    fromHome();
  }

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="col d-flex align-items-center justify-content-between mt-4 mx-md-5 mb-5">
            <h1 className="text display-3 ms-md-5">Editar Endereço</h1>
            <img
              src={SpaceX}
              alt="logo"
              className="img me-md-5"
              style={{ width: "15vh" }}
            />
          </div>
        </div>
      </div>

      <div className="container col-md-8 mx-auto">
        <div className="row">
          <form class="row g-3">
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">
                <strong>Planeta</strong>
              </label>
              <select
                class="form-select"
                id="inputGroupSelect01"
                ref={inputPlanet}
              >
                <option value="Terra">Terra</option>
                <option value="Marte">Marte</option>
              </select>
            </div>
            <div class="col-md-8">
              <label class="form-label">
                <strong>Nome</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                ref={inputName}
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">
                <strong>Cep</strong>
              </label>
              <input
                type="cep"
                class="form-control"
                id="inputCep"
                ref={inputCep}
              />
            </div>

            <div class="col-md-8">
              <label class="form-label">
                <strong>Rua</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputStreet"
                ref={inputStreet}
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">
                <strong>Número</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputNumber"
                ref={inputNumber}
              />
            </div>

            <div class="col-md-5">
              <label class="form-label">
                <strong>Bairro</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputDistrict"
                ref={inputDistrict}
              />
            </div>
            <div class="col-md-5">
              <label class="form-label">
                <strong>Cidade</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                ref={inputCity}
              />
            </div>
            <div class="col-md-2">
              <label class="form-label">
                <strong>UF</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="inputUf"
                ref={inputUf}
              />
            </div>

            <div className="container mt-4">
              <div className="d-grid gap-2 d-flex justify-content-end mb-4">
                <button
                  type="submit"
                  class="btn btn-secondary me-2"
                  onClick={fromHome}
                >
                  Sair
                </button>
                <button
                  type="submit"
                  class="btn btn-primary me-2"
                  onClick={save}
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAddress;
