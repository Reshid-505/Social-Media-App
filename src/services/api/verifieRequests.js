import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export async function getAllVerifies(){
    let result;
    await axios(BASE_URL+"/verifies")
    .then(res=>{result=res.data})
    return result
}
export async function getByIdVerifie(id){
    let result;
    await axios(BASE_URL+"/verifies/"+id)
    .then(res=>{result=res.data})
    return result
}
export async function addVerifie(data){
    let result;
    await axios.post(BASE_URL+"/verifies",data)
    .then(res=>{result=res.data})
    return result
}
export async function deleteVerifie(id){
    await axios.delete(BASE_URL+"/verifies/"+id)
}