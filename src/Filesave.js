import React, { Component } from "react";
import { Button } from "reactstrap";

class Filesave extends Component{
constructor(props){
    super(props);

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
                    <Button color="success" type="submit" >Save</Button>{' '}
                    <Button color="danger" type="button" onClick={this.props.cardCancel} >Cancel</Button>
                    <br /><br />
                </form>
            </div>    
            <br />

            </>
        )
    }
}
export default Filesave