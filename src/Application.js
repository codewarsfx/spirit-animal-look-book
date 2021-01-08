import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import ProfileCard from './ProfileCard';
import pick from 'lodash/pick' ;
import map from 'lodash/map';
import './Application.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.usersRef = null;
    this.userRef = null;
    this.state = {
      user: null,
      users: {}
    };
  }

  componentDidMount(){
   auth.onAuthStateChanged((user)=>{
     if(!user) return;
      this.usersRef= database.ref('/users');
     this.userRef = this.usersRef.child(`${user.uid}`);
       this.setState({
        user
      });
    

     this.userRef.once('value').then((snapshot)=>{
       
      if(snapshot.val()) return;
      this.userRef.set({
          photoURL:user.photoURL,
          name:user.displayName,
          email:user.email
      });

    
     });

     this.usersRef.on("value",(snapshot)=>{

      this.setState({
        users:snapshot.val()
      });

     });

   });


  }

  render() {
    const { user, users } = this.state;
 


    return (
      <div className="App">
        <header className="App--header">
          <h1>Social Animals</h1>
        </header>
        {
        user ?
        <div>
          <section className="profileCards">
            {
              map(users, (userData,uid)=>{

                return <ProfileCard key={uid}  uid={uid} user={userData}/>;

              })
            }
          </section>
          <CurrentUser user= {user}/>
        </div>
        :<SignIn/>
  }
      </div>
    );
  }
}

export default App;
