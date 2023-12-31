import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { Modal } from "react-bootstrap";
import './Style.css';
import Filesave from "./Filesave";

class Main extends Component {
    constructor(props) {
        super(props)
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);

        this.state = {
            filesavestate: false,
            addcount: 0,

            infoValue: '',
            fileValue: '',
            extenValue: '',
            sizeValue: '',
            typeValue: '',
            items: [],
            bitems: [],

            checkedCheckBox: false,
            MasterChecked: false,
            SelectedList: [],
            file: [],

            showModal: false,
            newInfoValue: '',
            oldInfoValue: '',

            targetValue: true
        };
    }


    addcard = () => {
        this.setState(prev => ({ addcount: prev.addcount + 1 }))
        this.setState({ filesavestate: true });
        //console.log("add card")
    }

    onChangeInfo(event) {
        this.setState({ infoValue: event.target.value })
    }

    onChangeFile = (event) => {
        this.setState({ fileValue: event.target.files[0].name });
        this.setState({ extenValue: event.target.files[0].name.split('.').pop() })
        this.setState({ sizeValue: Math.ceil((event.target.files[0].size) / 1024) });
        if (event.target.files[0].name.split('.').pop() === "pdf" ||
            event.target.files[0].name.split('.').pop() === "PDF"
        ) {
            this.setState({ typeValue: "pdf" })
        }
        else if (event.target.files[0].name.split('.').pop() === "docx") {
            this.setState({ typeValue: "Doc" })
        }
        else if (event.target.files[0].name.split('.').pop() === "png" ||
            event.target.files[0].name.split('.').pop() === "PNG" ||
            event.target.files[0].name.split('.').pop() === "jpg" ||
            event.target.files[0].name.split('.').pop() === "JPEG" ||
            event.target.files[0].name.split('.').pop() === "gif" ||
            event.target.files[0].name.split('.').pop() === "svg" ||
            event.target.files[0].name.split('.').pop() === "SVG"
        ) {
            this.setState({ typeValue: "Image" })
        }
        else if (event.target.files[0].name.split('.').pop() === "xlsx" ||
            event.target.files[0].name.split('.').pop() === "xlsm" ||
            event.target.files[0].name.split('.').pop() === "xlsb" ||
            event.target.files[0].name.split('.').pop() === "xltx" ||
            event.target.files[0].name.split('.').pop() === "xltm" ||
            event.target.files[0].name.split('.').pop() === "xls" ||
            event.target.files[0].name.split('.').pop() === "xlt" ||
            event.target.files[0].name.split('.').pop() === "csv"
        ) {
            this.setState({ typeValue: "Excel" })
        }
        else {
            this.setState({ typeValue: "Others" })
        }
    }

    onChangeInfo1 = (e) => {
        //console.log("onChangeInfo1")
        this.setState({ newInfoValue: e.target.value })
    }

    submitFile = (event) => {
        event.preventDefault();
        let items = [...this.state.items];
        if (Object.keys(this.state.infoValue).length == 0) {
            alert("Value is blank....")
        }
        else {
            //console.log("hai")
            items.push({ infoValue: this.state.infoValue, fileValue: this.state.fileValue, extenValue: this.state.extenValue, typeValue: this.state.typeValue, sizeValue: this.state.sizeValue })
            this.setState({
                items,
                infoValue: '',
                fileValue: '',
                extenValue: '',
                typeValue: '',
                sizeValue: ''
            });
            this.setState({ filesavestate: false })
            this.setState({ addcount: 0 })
            alert("Data Inserted into table..")
        }


    }


    cardCancel = (e) => {
        this.setState({ filesavestate: false })
        this.setState({ addcount: 0 })
    }



    onSingleCheck(e, it) {
        let tempList = this.state.items;
        tempList.map((sitem) => {
            if (sitem.infoValue === it.infoValue) {
                sitem.selected = e.target.checked;
            }
            return sitem;
        });
        const totalItems = this.state.items.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;
        this.setState({
            MasterChecked: totalItems === totalCheckedItems,
            // file: tempList,
            SelectedList: this.state.items.filter((e) => e.selected)
        })
    }

    onAllCheck(e) {
        let tempList = this.state.items;
        this.setState({ targetValue: e.target.checked, })
        tempList.map((aitem) => (
            aitem.selected = e.target.checked
        ));
        this.setState({
            MasterChecked: e.target.checked,
            SelectedList: this.state.items.filter((e) => e.selected),
        });
    }

    onAllCheck1(e) {

        if (this.state.SelectedList && this.state.SelectedList.length) {
            let tempList = this.state.items;
            this.setState({ targetValue: e.target.checked, })
            tempList.map((aitem) => (
                aitem.selected = e.target.checked
            ));
            this.setState({
                MasterChecked: e.target.checked,
                SelectedList: this.state.items.filter((e) => e.selected),
            });
            alert("De-Selected all checkbox")

        }
        else {
            alert("NO checkbox selected....")
        }
    }

    getSelectedRows() {
        this.setState({
            SelectedList: this.state.items.filter((e) => e.selected),
        });
    }


    selectbtn = (e) => {

        // this.state.items.map(selectbtnitem =>(
        //     console.log(selectbtnitem)
        // ))
        this.setState({
            MasterChecked: !this.state.MasterChecked,
            SelectedList: this.state.items.filter((e) => e.selected),
        })
    }

    deselectbtn = (e) => {
        e.preventDefault();

        this.setState({
            MasterChecked: !this.state.MasterChecked,
            SelectedList: this.state.items.filter((e) => e.selected),
        })
    }



    deletebtn = (e) => {
        // const abc=this.tabledata.items.filter((value)=>value.checked==false)
        // this.setState(tabledata:abc);
        if (this.state.SelectedList && this.state.SelectedList.length) {
            e.preventDefault();
            //console.log("delete")
            const arr1 = this.state.items;
            const arr2 = this.state.SelectedList;
            //console.log("Filter")
            // const arr3 = arr1.filter(value => arr2.includes(value)).filter((value, index, self) => self.indexOf(value) === index);
            // console.log(arr3)
            let unique1 = arr1.filter((o) => arr2.indexOf(o) === -1);
            let unique2 = arr2.filter((o) => arr1.indexOf(o) === -1);

            const unique = unique1.concat(unique2);
            //console.log(unique)
            this.setState({ items: unique })
            alert("Row is Deleted")
        }
        else {
            alert("NO checkbox selected....")
        }
    }

    handleClose = () => {
        this.setState({ showModal: false })
    }
    editbtn = (e) => {
        if (this.state.SelectedList && this.state.SelectedList.length) {
            this.setState({ showModal: true })
            e.preventDefault();
            //console.log("edit")
            this.state.SelectedList.map((selectitem) => (
                this.setState({ oldInfoValue: selectitem.infoValue })
            ))
        }
        else {
            alert("NO checkbox selected....")
        }
        // this.setState({ showModal: true})
        // e.preventDefault();
        // console.log("edit")
        // this.state.SelectedList.map((selectitem) =>(
        //     this.setState({oldInfoValue: selectitem.infoValue})
        // ))

    }

    onSubmitUpdate = (e) => {
        e.preventDefault();
        //console.log("edit submit")
        let search_to_change = this.state.oldInfoValue
        //console.log(search_to_change)
        this.state.items.forEach((item, index) => {
            if (item.infoValue == this.state.oldInfoValue) {
                this.state.items[index].infoValue = this.state.newInfoValue
            }
        })
        this.setState({ showModal: false })
        alert("Update Successfully...")

        // console.log(this.state.oldInfoValue)
        // console.log(this.state.newInfoValue)
    }


    render() {

        return (
            <div className="Main">
                <div className="heading">
                    <h1 className="heading-text">Interactive Card Organizer</h1>
                </div>
                <div className="button-container2">
                    <Button onClick={this.addcard}>
                        Add a Card
                    </Button>
                </div>
                <br /><br />

                {(this.state.filesavestate) ?
                    [...Array(this.state.addcount)].map((_, i) =>
                        <Filesave submitFile={this.submitFile}
                            onChangeInfo={this.onChangeInfo}
                            onChangeFile={this.onChangeFile}
                            cardCancel={this.cardCancel} key={i} />
                    )
                    :
                    null}


                <h1>Table Card Data</h1>
                <form>
                    <div className="table-container">
                        <Table bordered striped className="custom-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox"
                                            checked={this.state.MasterChecked}
                                            onChange={(e) => this.onAllCheck(e)}
                                        />
                                    </th>
                                    <th>Info</th>
                                    <th>File name</th>
                                    <th>Extension</th>
                                    <th>Type</th>
                                    <th>Size(KB)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.items.map((it) => {
                                    return (
                                        <tr key={it.infoValue} className={it.selected ? "selected" : ""}>
                                            <td>
                                                <input type="checkbox"
                                                    checked={this.state.MasterChecked}
                                                    checked={it.selected}
                                                    onChange={(e) => this.onSingleCheck(e, it)} />

                                            </td>
                                            <td>{it.infoValue}</td>
                                            <td>{it.fileValue}</td>
                                            <td>{it.extenValue}</td>
                                            <td>{it.typeValue}</td>
                                            <td>{it.sizeValue}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </div>


                    <div className="btn4">
                        <div id="ck-button">
                            <label>
                                <input type="checkbox" value="1"
                                    checked={this.state.MasterChecked}
                                    onChange={(e) => this.onAllCheck(e)}
                                /><span>Select All</span>
                            </label>
                        </div>

                        <div id="ck-button">
                            <label>
                                <input type="checkbox" value="1"
                                    checked={this.state.MasterChecked}
                                    onChange={(e) => this.onAllCheck1(e)}
                                /><span>De-Select All</span>
                            </label>
                        </div>
                        <br /><br />
                        <div className="button-container1">
                            <Button onClick={this.deletebtn} >Delete</Button>
                            <Button onClick={this.editbtn} >Edit</Button>
                        </div>
                    </div>
                </form>

                <br />

                {/* <button onClick={() => this.getSelectedRows()}>
                    Get Selected Items {this.state.SelectedList.length} 
                </button>                  */}





                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Your Card...</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <div style={{ borderStyle: "double", width: "350px" }}>
                            <h4>File save card</h4>


                            <form onSubmit={this.onSubmitUpdate}>

                                {this.state.SelectedList.map(edititem => {
                                    return (
                                        <>
                                            {/* <label htmlFor="info">Old Info: .</label> 
                                <input type="text" name="info" value={edititem.infoValue} onChange={this.onChangeInfo} /><br /><br /> */}
                                            {/* projects.find( p => p.value === 'jquery-ui' && ( p.desc = 'your value', true ) ); */}
                                            {/* this.props.items.find( p => p.infoValue === {edititem.infoValue} && ( p.infoValue = "kajal", true)); */}


                                        </>
                                    )
                                })}
                                <p>old value :- {this.state.oldInfoValue}</p>
                                <label htmlFor="info">New Info: .</label>
                                <input type="text" name="info" onChange={this.onChangeInfo1} /><br /><br />

                                {/* <p>new value :- {this.state.newInfoValue}</p> */}
                                {/* <label htmlFor="myfile">File: .</label>
                            <input type="file" id="myfile" name="myfile" onChange={this.onChangeFile} /><br /><br /> */}
                                <Button color="warning">Update</Button>{' '}
                                {/* <Button color="danger">Cancel</Button>{' '} */}
                                <br /><br />
                            </form>
                        </div>

                    </Modal.Body>

                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button> */}
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }
}

export default Main