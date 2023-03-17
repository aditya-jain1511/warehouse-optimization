import React, { useContext, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Alert, Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { InnerBoxAvailableContext } from '../context/InnerBoxAvailableContext'

const OutboxSuggestEntry = () => {
    const {inBoxInventory, setInBoxInventory} = useContext(InnerBoxAvailableContext)
    const [orderList,setOrderList] = useState([])

    const [inboxfilter,setInBoxFilter] = useState(false)

    const [genfilter,setGenFilter] = useState(false)

    const [formState, setFormState] = useState({
        materialCode: "",
        innerBoxCode: "",
        quantPBox: 0,
        totalMaterial: 0,
        numInnerBox:0,
        len:0,
        height: 0,
        width: 0,
        innerQuantity: 0,
    });

    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {

        setFormState((prevState) => {
            const { name, value } = e.target;
            if(name === "innerBoxCode" || name=== "materialCode")
                setInBoxFilter(false)
            if(name==="totalMaterial"){
                return ({...prevState,[name]:value, numInnerBox:Math.ceil(value/formState.quantPBox)})
            }
            return ({...prevState,[name]:value})
        });
    };

    const handleSubmit = (e) => {
        setGenFilter(false)

        e.preventDefault();

        if(formState.materialCode === "" || formState.innerBoxCode === "" || formState.quantPBox <= 0 || formState.totalMaterial <= 0 || formState.numInnerBox <= 0 || formState.len <= 0 || formState.height <= 0 || formState.width <= 0){
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
        
        const index = inBoxInventory.findIndex(el=>{
            return (el.materialCode === formState.materialCode &&
                el.innerBoxCode === formState.innerBoxCode
            )
        })
        const updateList = [...inBoxInventory]
        updateList[index].innerQuantity -= formState.numInnerBox
        setInBoxInventory(updateList)
        


        setFormState({
            materialCode: "",
            innerBoxCode: "",
            quantPBox: "",
            totalMaterial: 0,
            numInnerBox:0,
            len:0,
            height: 0,
            width: 0,
            innerQuantity: 0,
        });

        setInBoxFilter(false)
    };
    
    const handleDelete = (index) => {
        const updatedList = [...orderList];
        const addToList = updatedList[index]

        updatedList.splice(index, 1);
        setOrderList(updatedList);
        
        const indx = inBoxInventory.findIndex(el=>{
            return (el.materialCode === addToList.materialCode &&
                el.innerBoxCode === addToList.innerBoxCode
            )
        })
        const updateList = [...inBoxInventory]
        updateList[indx].innerQuantity += addToList.numInnerBox
        setInBoxInventory(updateList)
        
    };

    const innerBoxOptions = inBoxInventory.map((el)=>{
        if (el.materialCode === formState.materialCode){
            return(
                <option key={el.innerBoxCode} value={el.innerBoxCode}>{el.innerBoxCode}</option>
            )
        }
        else {return null}
    })

    const uniqueList = Array(undefined)

    const materialOption = inBoxInventory.map((el)=>{
        if(uniqueList.indexOf(el.materialCode)>0) return null
        uniqueList.push(el.materialCode)
        return(<>
            <option value={el.materialCode}>{el.materialCode}</option>
        </>)
    })

    const updateInnerBoxCode = () => {
        setInBoxFilter(true)
        if(formState.materialCode && formState.innerBoxCode){
            const quantVal = inBoxInventory.find((el)=>{
                return formState.materialCode === el.materialCode && 
                formState.innerBoxCode === el.innerBoxCode
            })
            const innerBoxVal = inBoxInventory.find((el)=>{
                return formState.innerBoxCode === el.innerBoxCode
            })
            setFormState({...formState, quantPBox:quantVal.quantPBox, len:innerBoxVal.len, height:innerBoxVal.height, width:innerBoxVal.width, innerQuantity:innerBoxVal.innerQuantity})
            
        }
    }

    const innerBoxList = inBoxInventory.map(el=>{
        if (el.materialCode === formState.materialCode){
            return(<>
                <div>
                    {el.innerBoxCode} - Quantity/Box: {el.quantPBox} - Dimension: {el.len}*{el.height}*{el.width} - InnerBoxes Available: {el.innerQuantity} - Total Quantity: {el.innerQuantity * el.quantPBox}
                </div>
            </>)
        }
    })

    const generationFilter = () => {
        setGenFilter(true)
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
            <br />
            <Row>
                <Col md="8">
                <FormGroup>
                    <Label for="materialCode">Material Code</Label>
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
                <div className="col-12">
                    Material Code: {formState.materialCode}
                </div>
                <div className="col-md-2 col-12">
                    Inner Boxes Available: 
                </div>
                <div className="col-md-10 col-12">
                    {innerBoxList}
                </div>
                <br />
                <br />
                <Col md="8">
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
                <div className="col-4 text-end">
                    <div for="filter">Select Box</div>
                    <div>

                    <Button onClick={updateInnerBoxCode} color="primary">Select Box</Button>
                    </div>
                </div>
                {formState.materialCode && formState.innerBoxCode && inboxfilter && <>
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
                    <Label for="height">height</Label>
                    <Input
                    type="number"
                    name="height"
                    id="height"
                    value={formState.height}
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
                    <Label for="totalMaterial">Total Material - max: {formState.innerQuantity * formState.quantPBox}</Label>
                    <Input
                    type="number"
                    name="totalMaterial"
                    id="totalMaterial"
                    min="0"
                    step={formState.quantPBox}
                    max={formState.innerQuantity * formState.quantPBox}
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
                <th>height </th>
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
                <td>{item.height}</td>
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

        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-6 text-end">Generate Result:</div>
                <div className="col-6 text-start"><Button onClick={generationFilter}>Generate</Button></div>
            </div>
        </div>

        {genfilter && orderList.length > 0  && 
            <div className='row'>
                <div className="col-12 text-center">
                <h3>
                    Recommendations would be shown here
                </h3>
                </div>
            </div>        
        }
        </>
    )
}

export default OutboxSuggestEntry



