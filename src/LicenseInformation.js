import React, {Component} from 'react';
import {Button, Panel, FormGroup, InputGroup, FormControl, Checkbox, ControlLabel, Well, ListGroup, ListGroupItem, ProgressBar} from 'react-bootstrap';
import * as firebase from 'firebase';

class LicenseInformation extends Component {
    constructor(props) {
      super(props);
      this.states= ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
      this.state = {
        licenses: [{idLN:'LiLN1', idED:'LiED1', idD: 'LiD1', idState: 'licensestate1', idDP: 'LiDP1', now: 0}],
        count: 2
      }
      this.formData = this.props.formData;
      this.createLicense = this.createLicense.bind(this);
      this.uploadHandler = this.uploadHandler.bind(this);
    }
    uploadHandler = (event : Object) => {
      const file = event.target.files[0];
      const ref = firebase.storage().ref(`${this.props.uaid}/Licenses/${event.target.id}`) ;
      var length = event.target.id.toString().length;
      var id = event.target.id.toString();
      var number = id.substring(length-1, length);
      console.log(number);
      const metadata = {
        state: document.getElementById(`licensestate${number}`).value,
        expiry: document.getElementById(`LiED${number}`).value,
        number: document.getElementById(`LiLN${number}`).value
      }
      console.log(metadata);
      event.persist();
      ref.put(file, metadata).on('state_changed', (snapshot:Object) => {
        var progress = Math.round(100 * snapshot.bytesTransferred / snapshot.totalBytes);
        console.log(progress);
        this.state.licenses[number-1].now = progress;
      }, () => {
        console.log("There was an error uploading your file, please try again.");
      }, (file) => {
        firebase.storage().ref(`${this.props.uaid}/Licenses/${event.target.id}`).getDownloadURL().then((url) =>{
          this.formData['userFolder'][event.target.id] = url;
        })
        // COMPLETE
        console.log("completed");
      })
    }
    createLicense (e) {
      e.preventDefault();
      // console.log("Creating new license");
      var newLicense = {
        idLN: `LiLN${this.state.count}`,
        idED: `LiED${this.state.count}`,
        idD: `LiD${this.state.count}`,
        idDP: `LiDP${this.state.count}`,
        idState : `licensestate${this.state.count}`,
        now : 0
      }
      // console.log(JSON.stringify(newLicense));
      this.setState((prevState) => ({
        licenses: prevState.licenses.concat(newLicense),
        count: this.state.count +1
      }));
    }
    render() {
      return (
            <Panel header="License Information">
              {
                this.state.licenses.map((item, i) =>
                <NewLicense progress={item.now} idD={item.idD} idED={item.idED} idLN={item.idLN} key={i} states={this.states} idState={item.idState} idDP={item.idDP} uploadHandle={this.uploadHandler}/>)
              }
              <Button onClick={this.createLicense}>Add Another License</Button>
            </Panel>
        );
      }
  }

function NewLicense(props) {
  return (
    <Well>
      <FormGroup>
        <InputGroup className="signup-item">
          <FormControl componentClass="select" id={props.idState} name={props.idState} placeholder="State">
            <option value="select">State</option>
            {props.states.map((item,i) => <option key={i} value={item.toString().toLowerCase()}>{item}</option>)}
          </FormControl>
        </InputGroup>
        <InputGroup className="signup-item">
          <FormControl type="text" id={props.idLN} name={props.idLN} placeholder="License Number"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <FormControl type="date" id={props.idED} name={props.idED} placeholder="Expiry Date"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <ProgressBar label={props.progress} now={props.progress} max={100} id={props.idDP} bsStyle="success"/>
          <FormControl type="file" id={props.idD} name={props.idD} onChange={props.uploadHandle} />
        </InputGroup>
      </FormGroup>
    </Well>
  );
}
export default LicenseInformation;
