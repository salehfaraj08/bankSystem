import React from 'react';
import "./style-register.css"
import { useHistory } from 'react-router-dom';


const Register = () => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState('');
  const [country, setCountry] = React.useState("");
  const history = useHistory();

  const addHandler = () => {
    console.log('register', name, age, country);
    history.push({
      pathname: '/users',
      state: {
        name: name,
        age: age,
        country: country,
        reg: true
      }
    })
  }


  return (
    <div className="Register">
      <div style={{ display: 'flex', justifyContent: 'center' }}><img className='bank' src="http://sundarbanpolicedistrict.org/images/bank.jpeg" /></div>
      <div className="inputtap">Name:<input
        type="text"
        value={name}
        name="name"
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
      />

        Age:<input
          type="text"
          value={age}
          name="age"
          placeholder="Your Age"
          onChange={(e) => setAge(e.target.value)}
        />

        Country:<input
          type="text"
          value={country}
          name="country"
          placeholder="Your Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <input type="button" value="Submit" onClick={addHandler} />
      </div>

    </div>
  )
};

export default Register;