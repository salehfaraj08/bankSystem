import React from "react";
import axios from "axios";
import './style-users.css';
import { useHistory } from 'react-router-dom';


const Users = () => {
  const history = useHistory();
  const [users, setUsers] = React.useState([]);
  const [IsCash, setIsCash] = React.useState(false);
  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    console.log('useeffect2', users);
    if (IsCash === false && users) {
      getcash();
    }
  });


  const getData = async () => {
    const response = await axios.get(`https://6178f183aa7f340017404614.mockapi.io/Customers`)
    console.log(response.data)
    setUsers(response.data)
  };


  const getcash = async () => {
    const transactions = [];

    if (users && users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        const response = await axios.get(`https://6178f183aa7f340017404614.mockapi.io/Customers/${users[i].id}/Bank`)
        transactions.push(response.data)

      }
    }
    console.log('trans:', transactions)
    const customerList = [...users];

    transactions.map(user => {
      let sum = 0;
      let find = '';
      user.map(user2 => {


        if (user.isWithdraw)
          sum -= user2.cash;
        else
          sum += user2.cash
        find = users.find(user => user.id === user2.CustomerId)
        return 0
      })
      find.cash = sum;
      setUsers(customerList)
      console.log(sum);
      console.log(find);
      setIsCash(true);
      return 0
    })
  };

  const addHandler = async () => {
    let min = Math.ceil(1000),
      max = Math.floor(50000),
      random = Math.floor(Math.random() * (max - min) + min);
    let data = {
      name: history.location.state.name,
      country: history.location.state.country,
      age: history.location.state.age,
      cash: random
    };
    const res = await axios.post(
      "https://6178f183aa7f340017404614.mockapi.io/Customers",
      data
    );
    console.log(res);
    let newData = res.data;
    const usersList = [...users];
    usersList.push(newData);
    setUsers(usersList);
  };
  const Deletehandler = async (id) => {
    const Delete = await axios.delete(
      `https://6178f183aa7f340017404614.mockapi.io/Customers/${id}`
    );
    if (Delete.status === 200) {
      const usersList = [...users];
      let deleteduser = usersList.filter((user) => {
        return user.id !== id;
      });
      setUsers(deleteduser);
    }
  };
  if (history.location.state !== undefined) {
    if (history.location.state.reg === true) {
      console.log('aaaaadddddddddddddddddd');
      addHandler();
    }
    history.location.state.reg = false;
    console.log('history location22222', history.location);
  }
  


  return (
    <div className="container">
      {/* <Register/> */}
      {users ? users.map((e, index) => {
        return (
          <div className="boxs" key={index}>
            <p > Created AT: {(e.createdAt).slice(0, 10)} <br />
              name: {e.name}<br />age: {(e.age / 1000).toFixed(0)}<br />
              country: {e.country}<br />UserName: {e.userName}<br />
              Password: {e.password} <br /> your cash: {e.cash}</p><br /><img alt="true" className="img" src={e.avatar} />
            <br />
            <input className="dele"
              type="button"
              value="delete"
              onClick={() => {
                Deletehandler(e.id);
              }}
            />
          </div>
        );
      })

        : <div>loading....</div>}

    </div>
  );

};

export default Users;
