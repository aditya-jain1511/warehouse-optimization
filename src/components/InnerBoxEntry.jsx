import React, { useContext, useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Table, Alert } from "reactstrap";
import {AiOutlineDelete} from "react-icons/ai"
import "../css/innerboxentry.css"
import { InnerBoxAvailableContext } from '../context/InnerBoxAvailableContext';

const InnerBoxEntry = () => {
    const {inBoxInventory, setInBoxInventory} = useContext(InnerBoxAvailableContext)

  const [formState, setFormState] = useState({
      plant:"",
      plantCode:"",
      materialCode:"",
      quantPBox:0,
      innerBoxCode: "",
      len: 0,
      height: 0,
      width: 0,
      innerQuantity:0
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(formState.plant && formState.plantCode && formState.materialCode && formState.len && formState.len && formState.width){
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        innerBoxCode: formState.plant.substring(0,2).toUpperCase()+formState.plantCode+formState.materialCode.substring(0,4)+formState.len + formState.len + formState.width,
      }));
    }
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = inBoxInventory.some(
        (item) =>
          item.plant === formState.plant &&
          item.plantCode === formState.plantCode &&
          item.materialCode === formState.materialCode &&
          item.len === formState.len &&
          item.height === formState.len &&
          item.width === formState.width
    );
  
    if (exists) {
        setShowAlert(true);
        return;
    }

    setInBoxInventory((prevState) => [...prevState, formState]);
    setFormState({
      plant:"",
      plantCode:"",
      materialCode:"",
      quantPBox:0,
      innerBoxCode: "",
      len: 0,
      height: 0,
      width: 0,
      innerQuantity:0
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
        <br />
      <Row>
        <Col md="2">
          <FormGroup>
            <Label for="plant">Plant</Label>
            <Input
              type="text"
              name="plant"
              id="plant"
              required
              value={formState.plant}
              onChange={handleInputChange}
            >       
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label for="plantCode">Plant Code</Label>
            <Input
              type="text"
              name="plantCode"
              id="plantCode"
              required
              value={formState.plantCode}
              onChange={handleInputChange}
            >       
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label for="materialCode">Material Code</Label>
            <Input
              type="text"
              name="materialCode"
              id="materialCode"
              required
              value={formState.materialCode}
              onChange={handleInputChange}
              >
            </Input>
          </FormGroup>
        </Col> 
        <Col md="1">
          <FormGroup>
            <Label for="len">Length</Label>
            <Input
              type="number"
              name="len"
              min="1"
              id="len"
              required
              value={formState.len}
              onChange={handleInputChange}
              />
          </FormGroup>
        </Col>
        <Col md="1">
          <FormGroup>
            <Label for="height">Height</Label>
            <Input
              type="number"
              name="height"
              min="1"
              id="height"
              required
              value={formState.height}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md="1">
          <FormGroup>
            <Label for="width">Width</Label>
            <Input
              type="number"
              name="width"
              min="1"
              id="width"
              required
              value={formState.width}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md="1">
          <FormGroup>
            <Label for="quantPBox">Quant Per Box</Label>
            <Input
              type="number"
              name="quantPBox"
              min="1"
              id="quantPBox"
              required
              value={formState.quantPBox}
              onChange={handleInputChange}
              />
          </FormGroup>
        </Col>
      </Row>
      
    </Form>

    {/* display alert if value already exists */}
    <Alert color="danger" isOpen={showAlert} toggle={() => setShowAlert(false)}>
        A value already exists.
    </Alert>

    <Table>
        <thead>
          <tr>
            <th>Plant</th>
            <th>Plant Code</th>
            <th>Material Code</th>
            <th>Quant Per Box</th>
            <th>InnerBox Code</th>
            <th>Length</th>
            <th>Height</th>
            <th>Width</th>
            <th>InnerBox Quantity</th>
            <th>{" "}</th>
          </tr>
        </thead>
        <tbody>
          {inBoxInventory.map((item, index) => (
            <tr key={index}>
              <td>{item.plant}</td>
              <td>{item.plantCode}</td>
              <td>{item.materialCode}</td>
              <td>{item.quantPBox}</td>
              <td>{item.innerBoxCode}</td>
              <td>{item.len}</td>
              <td>{item.height}</td>
              <td>{item.width}</td>
              <td>{item.innerQuantity}</td>
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
