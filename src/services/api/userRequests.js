import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export async function getAllUsers(){
    let result;
    await axios(BASE_URL+"/users")
    .then(res=>{result=res.data})
    return result
}
export async function getByIdUser(id){
    let result;
    await axios(BASE_URL+"/users/"+id)
    .then(res=>{result=res.data})
    return result
}
export async function addUser(data){
    let result;
    await axios.post(BASE_URL+"/users",data)
    .then(res=>{result=res.data})
    return result
}
export async function editUser(id,data){
    let result;
    await axios.put(BASE_URL+"/users/"+id,data)
    .then(res=>{result=res.data})
    return result
}