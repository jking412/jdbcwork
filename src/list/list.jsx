import React from "react";
import './list.css'
import Item from './item/item'
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8080',
});

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList: [],
            activeUser: {},
            submitMessage: '提交',
            formTitle: '新增用户',
        }
        this.requestUserList = this.requestUserList.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
        this.showActiveUser = this.showActiveUser.bind(this);
        this.removeActiveUser = this.removeActiveUser.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.requestUserList();
    }

    renderList(){
        let len = 0;
        return this.state.userList.map((item) => {
            if(len > 5){
                return null;
            }
            len++;
            return <Item key={item.id} item={item} deleteUserById={this.deleteUserById} showActiveUser={this.showActiveUser}/>
        });
    }

    requestUserList(){
        client.get('/user/allUsers')
            .then((response) => {
                this.setState({
                    userList: response.data,
                });
                console.log(response.data);
            }).catch((error) => {
            console.log(error);
        });
    }

    deleteUserById(id){
        client.post('/user/deleteUser', {
            "id": id,
        }).then((response) => {
                console.log(response.data);
                this.requestUserList();
            }).catch((error) => {
            console.log(error);
        });
    }

    showActiveUser(id){
        let activeUser = this.state.activeUser;
        if(activeUser.id === id){
            return;
        }
        this.state.userList.forEach((item) => {
            if(item.id === id){
                activeUser = item;
            }
        }
        );
        this.setState({
            activeUser: activeUser,
            formTitle: '编辑用户',
            submitMessage: '更新',
        });
        document.getElementById('id').value = activeUser.id;
        document.getElementById('name').value = activeUser.name;
        document.getElementById('age').vaule = activeUser.age;
        document.getElementById('email').value = activeUser.email;
        document.getElementById('phone').value = activeUser.phone;
        document.getElementById('password').value = activeUser.password;
    }

    removeActiveUser(){
        const activeUser = {
            id: '',
            name: '',
            age: '',
            email: '',
            phone: '',
            password: '',
        }
        this.setState({
            activeUser: activeUser,
            submitMessage: '提交',
            formTitle: '新增用户',
        });
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('password').value = '';
    }

    submitUser(e){
        e.preventDefault();
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const activeUser = {
            id: id,
            name: name,
            age: age,
            email: email,
            phone: phone,
            password: password,
        }
        if(this.state.submitMessage === '提交'){
            client.post('/user/addUser', activeUser)
                .then((response) => {
                    console.log(response.data);
                    this.requestUserList();
                }).catch((error) => {
                console.log(error);
            });
        }else{
            client.post('/user/updateUser', activeUser)
                .then((response) => {
                    console.log(response.data);
                    this.requestUserList();
                }).catch((error) => {
                console.log(error);
            });
        }
    }

    render(){

        return(
            <div className="main">
                <div className="list">
                    <div className="list-header">
                        用户列表
                     </div>   
                    {this.renderList()}
                    <div className="list-footer" onClick={this.removeActiveUser}>
                        <span className="material-symbols-outline">
                            add
                        </span>
                    </div>
                </div>
                <div className="list-detail">
                    <div className="list-detail-header">
                        {this.state.formTitle}
                    </div>
                    <form>
                        <div className="form-id">
                            <input type="hidden" id="id" readOnly/>
                        </div>
                        <div className="form-item">
                            <label>姓名:</label>
                            <input type="text" id="name" required/>
                        </div>
                        <div className="form-item">
                            <label>年龄:</label>
                            <input type="text" id="age"/>
                        </div>
                        <div className="form-item">
                            <label>邮箱:</label>
                            <input type="text" id="email"/>
                        </div>
                        <div className="form-item">
                            <label>电话:</label>
                            <input type="text" id="phone"/>
                        </div>
                        <div className="form-item">
                            <label>密码:</label>
                            <input type="password" id="password" required/>
                        </div>
                        <div className="form-btn">
                            <button type="submit" onClick={(e) => (this.submitUser(e))}>{this.state.submitMessage}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default List;