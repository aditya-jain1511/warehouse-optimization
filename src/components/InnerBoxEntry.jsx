import React, { useContext, useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Table, Alert } from "reactstrap";
import {AiOutlineDelete} from "react-icons/ai"
import "../css/innerboxentry.css"
import { InnerBoxAvailableContext } from '../context/InnerBoxAvailableContext';

const InnerBoxEntry = () => {
    const {inBoxInventory, setInBoxInventory} = useContext(InnerBoxAvailableContext)

  const [formState, setFormState] = useState({
    innerBoxName: "",
    innerBoxCode: "",
    len: 0,
    breadth: 0,
    width: 0,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formState.innerBoxName === "" || formState.innerBoxCode === "" || formState.len <= 0 || formState.breadth <= 0 || formState.width <= 0){
      return null
    }

    const exists = inBoxInventory.some(
        (item) =>
          item.innerBoxCode === formState.innerBoxCode
    );
  
    if (exists) {
        setShowAlert(true);
        return;
    }

    setInBoxInventory((prevState) => [...prevState, formState]);
    setFormState({
      innerBoxName: "",
      innerBoxCode: "",
      len: 0,
      breadth: 0,
      width: 0,
    });
  };
  
  const handleDelete = (index) => {
    const updatedInventory = [...inBoxInventory];
    updatedInventory.splice(index, 1);
    setInBoxInventory(updatedInventory);
  };

  return (
    <>
    <Form onSubmit={handleSubmit} className="single-row-form">
        <div className="row">
            <h5 className="col-10">Add Inventory For Inner Box</h5>
            <div className="col-2 text-end">
                <Button type="submit" color="primary">+ Add </Button>
            </div>
        </div>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label for="innerBoxName">InnerBox Name</Label>
            <Input
              type="text"
              name="innerBoxName"
              id="innerBoxName"
              value={formState.innerBoxName}
              onChange={handleInputChange}
            >       
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label for="innerBoxCode">Innerbox Code</Label>
            <Input
              type="text"
              name="innerBoxCode"
              id="innerBoxCode"
              value={formState.innerBoxCode}
              onChange={handleInputChange}
              >
            </Input>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label for="len">Length</Label>
            <Input
              type="number"
              name="len"
              id="len"
              value={formState.len}
              onChange={handleInputChange}
              />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label for="breadth">Breadth</Label>
            <Input
              type="number"
              name="breadth"
              id="breadth"
              value={formState.breadth}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label for="width">Width</Label>
            <Input
              type="number"
              name="width"
              id="width"
              value={formState.width}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
      </Row>
      
    </Form>

    {/* display alert if value already exists */}
    <Alert color="danger" isOpen={showAlert} toggle={() => setShowAlert(false)}>
        A value with the same Product Code and Material Code already exists.
    </Alert>

    <Table>
        <thead>
          <tr>
            <th>InnerBox Name</th>
            <th>InnerBox Code</th>
            <th>Length</th>
            <th>Breadth</th>
            <th>Width</th>
            <th>{" "}</th>
          </tr>
        </thead>
        <tbody>
          {inBoxInventory.map((item, index) => (
            <tr key={index}>
              <td>{item.innerBoxName}</td>
              <td>{item.innerBoxCode}</td>
              <td>{item.len}</td>
              <td>{item.breadth}</td>
              <td>{item.width}</td>
              <td>
                <div id="deleteIcon">
                    <AiOutlineDelete onClick={()=> handleDelete(index)}></AiOutlineDelete>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
    </Table>

    
    </>
  );
};

export default InnerBoxEntry;
