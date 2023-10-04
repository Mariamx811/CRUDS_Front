import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import editImg from "../imgs/edit.png";
import deleteImg from "../imgs/delete.png";
import Swal from 'sweetalert2';
import IUser from "../Iuser";
import UserPop from "./UserPop";

const UserTable: FC = () => {
  
  const [users,setUsers] = useState<IUser[]>([]);
  const [userPopup, setClickPopUp] = useState<IUser|undefined>();
  
  useEffect(() => {
    getUsers()
  },[])
  

  
  //Edit User View
  async function editForm(id :number, userName: string, pass: string, gender:string, active:number, email:string, name:string){
    const { value: formValues } = await Swal.fire({
      title: `Input new data for ${userName}`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      html:
      '<label for="emaill" style="margin: 1.7rem"> Email </label> '+
      '<input type="email" id="emaill" style="margin-left: 2.4rem"> <br>'+
      '<label for="user" style="margin: 1rem"> UserName </label> '+
      '<input type="text" id="user" style="margin-left: 1rem" required> <br>'+
      '<label for="namee" style="margin: 1.3rem"> Name </label> '+
      '<input type="text" id="namee" style="margin-left: 3.1rem" required> <br>'+
      '<input type="radio" id="activate" name= "radio" value="1" style="margin-top: 1.5rem"'+
      '<label for="activate"> Activate </label> <br>'+
      '<input type="radio" id="inactive" name= "radio" value="0"'+
      '<label for="inactive"> Inactive </label> <br>',
      focusConfirm:false,
      preConfirm: () =>{
        let checkedRadio = document.getElementsByName('radio');
        if((checkedRadio[0] as HTMLInputElement).checked)
            active = 1;
        else 
          active = 0;
        return[
          id,
          (document.getElementById('user')as HTMLInputElement).value,
          pass,
          gender,
          active,
          (document.getElementById('emaill')as HTMLInputElement).value,
          (document.getElementById('namee')as HTMLInputElement).value,
        ]
      }
    }) 
    if(formValues && formValues.length > 0){
      console.log(formValues[0],formValues[1],formValues[2],formValues[3],formValues[4],formValues[5],formValues[6]);
      
      editUserAPI(formValues);
      Swal.fire(
        'Saved',
        'User have been updated',
        'success'
      )
    }
  }

  //Edit User info by calling API
  async function editUserAPI(values:(string | number | boolean)[]){
    let [id ,user,pass,gender,active,mail,name] = values;  
    console.log(active)
    try{
        const { data } = await axios.put(
          `http://localhost:8080/users/${id}`,
          {
            user: `${user}`,
            pass: `${pass}`,
            gender: `${gender}`,
            active: `${active}`,
            mail: `${mail}`,
            name: `${name}`,
          },
        )
        getUsers();
    }catch(err){
      console.log(err);
    }    
  }

  //Delete User from the database
  function deleteUser(id :number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserAPI(id);
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })
  }

  //Calling the delete user API
  async function deleteUserAPI(id : number){
    console.log(id);
    try{
        const {data} = await axios.delete(
        `http://localhost:8080/users/${id}`
      )
      getUsers()
      
    }catch(err){
      console.log(err);
    }
  }

  //Show all users in database as a table
  async function getUsers(){
        try{
            const {data} = await axios.get(
                'http://localhost:8080/users/'
            )
            setUsers(data);
        }catch(err){
            console.log(err);
        }
    }
    //Check pop ups
    return (
    <table className="userTable">
      <h1>Users</h1>
      <tr>
        <th>UserName</th>
        <th>Activation</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <UserPop user = {userPopup} flag={Boolean(userPopup)} stat={setClickPopUp}/>  
    {users.length > 0 ? 
      users.map((user)=>{
        
        return (
        <tr>
          <td className="click" onClick={() => setClickPopUp(user)}>{user.user}</td>
          <td>{user.active === 1 ? "Active" :"Inactive"}</td>
          <td onClick={() => editForm(user.id,user.user,user.pass,user.gender,user.active,user.mail,user.name)}>
          <img className="click" src={editImg} width={15} alt ='img'></img></td>
          <td onClick={() => { deleteUser(user.id)}}><img className="click" src={deleteImg} width={15} alt='img'></img></td>
        </tr> 
      )
    })
     : ''}
    </table>
  );
}

export default UserTable;