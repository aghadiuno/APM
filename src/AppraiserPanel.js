import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Well} from 'react-bootstrap';
import review from './res/review.jpg';
import loading from './res/loading.gif';

class AppraiserPanel extends Component {
  constructor(props){
    super(props);
    const uuid = firebase.auth().currentUser.uid;
    this.userRef = firebase.database().ref('users/'+ uuid);
    this.state = {
      approved : 'loading'
    }
  }
  componentDidMount() {
    this.userRef.on('value', (snapshot) => {
      // console.log(snapshot.val());
      this.setState({
        approved: snapshot.val().approved
      })
    })
  }
  render() {
    return (
      <div>
        {this.state.approved === 'loading' ? <img src={loading} alt="loading..."/> :
         this.state.approved ? <p>approved</p> : <AwaitingApproval />}
      </div>
    );
  }
}

function AwaitingApproval() {
  return(
    <div className="awaiting-approval">
      <Well>
        <img src={review} alt="" />
        <h2>Your application is still under review.</h2>
        <h6></h6>
        <h4>Keep an eye on your email - {firebase.auth().currentUser.email}.</h4>
        <h6></h6>
        <h4>We will send you an email letting you know when your application has been processed.</h4>
      </Well>
    </div>
  );
}

export default AppraiserPanel;
