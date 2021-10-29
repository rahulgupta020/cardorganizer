import React, { Component } from "react";
import { Button } from "reactstrap";

class Filesave extends Component{
constructor(props){
    super(props);



    this.state={

    }
}
    savebtn(){
        console.log("save")
    }

    cancelbtn(){
        console.log("cancel")
    }


    



    render(){
        return(
            <>
            <div style={{borderStyle: "double", width: "350px"}}>
                <h4>File save card</h4>
                <form onSubmit={this.props.submitFile}>
                    <label htmlFor="info">Info: .</label> 
                    <input type="text" name="info" onChange={this.props.onChangeInfo} /><br /><br />
                    <label htmlFor="myfile">File: .</label>
                    <input type="file" id="myfile" name="myfile" onChange={this.props.onChangeFile} /><br /><br />
                    <Button color="success">Save</Button>{' '}
                    <Button color="danger">Cancel</Button>{' '}
                    <br /><br />
                </form>
            </div>    

                <br /><br />
                {/* <Button onClick={this.savebtn} color="success" style={{marginRight:"15px"}}>Save</Button> */}
                {/* <Button onClick={this.cancelbtn} color="danger" style={{marginRight:"15px"}}>Cancel</Button> */}
                <br /><br />

                {/* {this.state.items.map((it, index) => (
                    <ul>
                        <li>{it.infoValue}</li>
                        <li>{it.fileValue}</li>
                        <li>{it.extenValue}</li>
                        <li>{it.typeValue}</li>
                        <li>{it.sizeValue}</li>
                    </ul>
                ))} */}

                {/* <Tab items={this.state.items} /> */}

            </>
        )
    }
}
export default Filesave