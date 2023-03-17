import React, { useContext, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Alert, Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { InnerBoxAvailableContext } from '../context/InnerBoxAvailableContext'
import { MaterialListContext } from '../context/MaterialListContext'
import "../css/materialinventory.css"

const OutboxSuggestEntry = () => {
    const {inBoxInventory, setInBoxInventory} = useContext(InnerBoxAvailableContext)
    const {materialList, setMaterialList} = useContext(MaterialListContext)
    const [orderList,setOrderList] = useState([])
    const [filter,setFilter] = useState(false)

    const [formState, setFormState] = useState({
        materialCode: "",
        innerBoxCode: "",
        quantPBox: 0,
        totalMaterial: 0,
        numInnerBox:0,
        len:0,
        breadth: 0,
        width: 0,
    });

    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {
        setFormState((prevState) => {
            const { name, value } = e.target;
            if(name==="totalMaterial"){
                return ({...prevState,[name]:value, numInnerBox:Math.ceil(value/formState.quantPBox)})
            }
            return ({...prevState,[name]:value})
        });
        console.log(formState)
    };

    const handleSubmit = (e) => {
        setFilter(false)

        e.preventDefault();

        if(formState.materialCode === "" || formState.innerBoxCode === "" || formState.quantPBox <= 0 || formState.totalMaterial <= 0 || formState.numInnerBox <= 0 || formState.len <= 0 || formState.breadth <= 0 || formState.width <= 0){
            return null
        }


        const exists = orderList.some(
            (item) =>
            item.materialCode === formState.materialCode &&
            item.innerBoxCode === formState.innerBoxCode
        );
    
        if (exists) {
            setShowAlert(true);
            return;
        }

        setOrderList((prevState) => [...prevState, formState]);
        setFormState({
            materialCode: "",
            innerBoxCode: "",
            quantPBox: "",
            totalMaterial: 0,
            numInnerBox:0,
            len:0,
            breadth: 0,
            width: 0,
        });
    };
    
    const handleDelete = (index) => {
        const updatedList = [...orderList];
        updatedList.splice(index, 1);
        setOrderList(updatedList);
    };

    const innerBoxOptions = materialList.map((el)=>{
        if (el.materialCode === formState.materialCode){
            return(
                <option key={el.innerBoxCode} value={el.innerBoxCode}>{el.innerBoxCode}</option>
            )
        }
        else {return null}
    })

    const uniqueList = []

    const materialOption = materialList.map((el)=>{
        const indexFunc = uniqueList.indexOf(el.materialCode)
        if(indexFunc > 0){
            return null
        }
        else{
            uniqueList.push(el.materialCode)
            return(
                <option key={el.id} value={el.materialCode}>{el.materialCode} </option>
            )
        }
    })

    const updateArgs = () => {
        setFilter(true)
        console.log(1, formState)
        if(formState.materialCode && formState.innerBoxCode){
            const quantVal = materialList.find((el)=>{
                return formState.materialCode === el.materialCode && 
                formState.innerBoxCode === el.innerBoxCode
            })
            const innerBoxVal = inBoxInventory.find((el)=>{
                return formState.innerBoxCode === el.innerBoxCode
            })
            setFormState({...formState, quantPBox:quantVal.quantPBox, len:innerBoxVal.len, breadth:innerBoxVal.breadth, width:innerBoxVal.width})
            
        }
    }
    
    return (
        <>
        <Form onSubmit={handleSubmit} className="single-row-form">
            <div className="row">
                <h5 className="col-10">Add to Order List</h5>
                <div className="col-2 text-end">
                    <Button type="submit" color="primary">+ Add </Button>
                </div>
            </div>
            <Row>
                <Col md="5">
                <FormGroup>
                    <Label for="materialCode">Product Code</Label>
                    <Input
                    type="select"
                    name="materialCode"
                    id="materialCode"
                    value={formState.materialCode}
                    onChange={handleInputChange}
                    >
                        <option value="">Select Material Code</option>
                        {materialOption}
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
                    <option value="">Select InnerBox Code</option>
                    {innerBoxOptions}
                    </Input>
                </FormGroup>
                </Col>
                <div className="col-2 text-end">
                    <div for="filter">Select Box</div>
                    <div>

                    <Button onClick={updateArgs} color="primary">Select Box</Button>
                    </div>
                </div>
                {formState.materialCode && formState.innerBoxCode && filter && <>
                <Col md="2">
                <FormGroup>
                    <Label for="quantPBox">quantPBox</Label>
                    <Input
                    type="number"
                    name="quantPBox"
                    id="quantPBox"
                    value={formState.quantPBox}
                    onChange={handleInputChange}
                    readOnly={true}
                    />
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
                    />
                </FormGroup>
                </Col>
                <Col md="2">
                <FormGroup>
                    <Label for="totalMaterial">Total Material</Label>
                    <Input
                    type="number"
                    name="totalMaterial"
                    id="totalMaterial"
                    value={formState.totalMaterial}
                    onChange={handleInputChange}
                    />
                </FormGroup>
                </Col>
                <Col md="2">
                <FormGroup>
                    <Label for="len">InnerBox No.</Label>
                    <Input
                    type="number"
                    name="numInnerBox"
                    id="numInnerBox"
                    value={Math.ceil(formState.totalMaterial / formState.quantPBox)}
                    onChange={handleInputChange}
                    readOnly={true}
                    />
                </FormGroup>
                </Col>   
                </>
                }
                
            </Row>
            
        </Form>

        <Alert color="danger" isOpen={showAlert} toggle={() => setShowAlert(false)}>
            A value with the same Product Code and Material Code already exists.
        </Alert>

        <Table>
            <thead>
            <tr>
                <th>Material Code</th>
                <th>InnerBox Code</th>
                <th>Quantity per Box</th>
                <th>Length</th>
                <th>Breadth </th>
                <th>Width</th>
                <th>Total Quantity</th>
                <th>No. of Innerbox</th>
                <th>{" "}</th>
            </tr>
            </thead>
            <tbody>
            {orderList.map((item, index) => (
                <tr key={index}>
                <td>{item.materialCode}</td>
                <td>{item.innerBoxCode}</td>
                <td>{item.quantPBox}</td>
                <td>{item.len}</td>
                <td>{item.breadth}</td>
                <td>{item.width}</td>
                <td>{item.totalMaterial}</td>
                <td>{item.numInnerBox}</td>
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

export default OutboxSuggestEntry



