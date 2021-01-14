import React, { Component, PropTypes } from 'react';
import FileInput from 'react-file-input';
import { storage, database } from './firebase';
import './ProfileCard.css';

class ProfileCard extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.userRef=null;
    this.state={
      progress:0
    };
    
  }

  handleSubmit(e){
    const file = e.target.files[0];
    const fileUploadTask= storage.ref('userpictures').child(`${this.props.uid}`)
                                                      .child(this.props.user.name)
                                                      .put(file);

      fileUploadTask.on('state_changed',snapshot=>{

        this.setState({
          progress: snapshot.bytesTransferred/snapshot.totalBytes * 100
        });

      });
                                                      
    fileUploadTask.then((snapshot)=>{     
      this.userRef= database.ref(`users/${this.props.uid}`)
                            .child('photoURL').set(snapshot.downloadURL);
    });
    

  }

  render() {
    const {photoURL,name}= this.props.user;

    return (
      <article className="ProfileCard">
        <img src={photoURL} className='ProfileCard--photo'/>
        <h3>{name}</h3>
        <FileInput
        placeholder= 'change profile image'
        onChange={this.handleSubmit}
        />
        <progress min='0' max='100' value={`${this.state.progress}`}/>

      </article>
    );
  }
}

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

export default ProfileCard;
