import React, { useContext, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Alert, Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { InnerBoxAvailableContext } from '../context/InnerBoxAvailableContext'
import { MaterialListContext } from '../context/MaterialListContext'
import "../css/materialinventory.css"

const MaterialInventory = () => {
    const {inBoxInventory, setInBoxInventory} = useContext(InnerBoxAvailableContext)
    const {materialList, setMaterialList} = useContext(MaterialListContext)

    const [formState, setFormState] = useState({
        materialCode: "",
        quantPBox: 0,
        innerBoxCode: "",
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

    const exists = materialList.some(
        (item) =>
          item.materialCode === formState.materialCode &&
          item.innerBoxCode === formState.innerBoxCode
    );
  
    if (exists) {
        setShowAlert(true);
        return;
    }

    setMaterialList((prevState) => [...prevState, formState]);
    setFormState({
        materialCode: "",
        quantPBox: 0,
        innerBoxCode: "",
        });
    };
    
    const handleDelete = (index) => {
        const updatedList = [...materialList];
        updatedList.splice(index, 1);
        setMaterialList(updatedList);
    };

    const innerBoxOptions = inBoxInventory.map((el)=>{
        return(
            <>
                <option value={el.innerBoxCode}>{el.innerBoxCode} - {el.len}*{el.breadth}*{el.width} </option>
            </>
        )
    })
    
    return (
        <>
        <Form onSubmit={handleSubmit} className="single-row-form">
            <div className="row">
                <h5 className="col-10">Add to Material List</h5>
                <div className="col-2 text-end">
                    <Button type="submit" color="primary">+ Add </Button>
                </div>
            </div>
            <Row>
                <Col md="5">
                <FormGroup>
                    <Label for="materialCode">Product Code</Label>
                    <Input
                    type="text"
                    name="materialCode"
                    id="materialCode"
                    value={formState.materialCode}
                    onChange={handleInputChange}
                    >
                    </Input>
                </FormGroup>
                </Col>
                <Col md="5">
                <FormGroup>
                    <Label for="innerBoxCode">InnerBox Code</Label>
                    <Input
                    type="select"
                    name="innerBoxCode"
                    id="innerBoxCode"
                    value={formState.innerBoxCode}
                    onChange={handleInputChange}
                    >
                    <option value="">Select Material Code</option>
                    {innerBoxOptions}
                    </Input>
                </FormGroup>
                </Col>
                <Col md="2">
                <FormGroup>
                    <Label for="quantPBox">quantPBox</Label>
                    <Input
                    type="number"
                    name="quantPBox"
                    id="quantPBox"
                    value={formState.quantPBox}
                    onChange={handleInputChange}
                    />
                </FormGroup>
                </Col>
                
            </Row>
            
        </Form>

        <Alert color="danger" isOpen={showAlert} toggle={() => setShowAlert(false)}>
            A value with the same Product Code and Material Code already exists.
        </Alert>

        <Table>
            <thead>
            <tr>
                <th>Material Code</th>
                <th>Quantity per Box</th>
                <th>InnerBox Code</th>
                <th>{" "}</th>
            </tr>
            </thead>
            <tbody>
            {materialList.map((item, index) => (
                <tr key={index}>
                <td>{item.materialCode}</td>
                <td>{item.quantPBox}</td>
                <td>{item.innerBoxCode}</td>
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
    )
}

export default MaterialInventory
