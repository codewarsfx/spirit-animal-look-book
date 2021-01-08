import React, { Component, PropTypes } from 'react';
import FileInput from 'react-file-input';
import { storage, database } from './firebase';
import './ProfileCard.css';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){

    const file = e.target.files[0];

  }

  render() {
    const {photoURL,displayName}= this.props.user;

    return (
      <article className="ProfileCard">
        <img src={photoURL} className='ProfileCard--photo'/>
        <h3>{displayName}</h3>
        <FileInput
        placeholder= 'change profile image'
        onChange={this.handleSubmit}
        />

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
