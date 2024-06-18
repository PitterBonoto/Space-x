import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Address({ children, removeAddress }) {
  async function handleDelete() {
    await axios.delete(`https://space-x-api.vercel.app/addresses/${children.id}`);
    removeAddress(children.id);
  }

  const navigate = useNavigate();
  function editAddress() {
    navigate(`/edit/${children.id}`);
  }

  return (
    <Card className="mt-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{children.name}</Card.Title>
          <Card.Text>{children.planet}</Card.Text>
        </div>
        <Card.Subtitle className="mb-2 text-muted">
         {children.city} - {children.uf}
        </Card.Subtitle>
      <Card.Text>{children.street}, {children.number} - {children.district}</Card.Text>

        <div className="container">
          <div className="d-grid gap-2 d-flex justify-content-end">
            <Card.Link
              onClick={editAddress}
              className="btn btn-outline-secondary"
            >
              Editar
            </Card.Link>
            <Card.Link
              onClick={handleDelete}
              className="btn btn-outline-danger"
            >
              Excluir
            </Card.Link>
          </div>
        </div>
        
      </Card.Body>
    </Card>
  );
}

export default Address;
