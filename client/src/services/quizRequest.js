import axios from "axios";

const jwt=localStorage.getItem('jwt');
const axiosInstance=axios.create({
    withCredentials:'true',
    Cookie:jwt,
})

const questionreq=async(data)=>{
    let result;
    axiosInstance.get(`http://localhost:8080/api/model/question/${data}`).then(res=>{result=res})
    return result;
}
export {questionreq}