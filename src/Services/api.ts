import axios from 'axios';
const protocol = "http://";
const domain = "localhost:3000";
const appurl = protocol+domain;

export interface IUser{
id:number;
name:string;
username:string;
email:string;
phone:string;
}

export class ApiService{
    async getUsers(){
        const response = await axios.get(appurl+"/users");
        return response.data;
    }
    async createUser(user:IUser){
       const response =await axios.post(`${appurl}/users`,user);
       return response.data;
    }
    async updateUser(id:number,user:IUser){
        const response = await axios.put(`${appurl}/users/${id}`,user);
        return response.data;
    }
    async deleteUser(id:number){
        const response = await axios.delete(`${appurl}/users/${id}`);
        return response.data;
    }
}

