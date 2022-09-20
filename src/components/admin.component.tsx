import { Cascader, Checkbox, DatePicker, Form, InputNumber, Modal, Radio, Select, Switch, TreeSelect } from "antd";
import { Component, PropsWithChildren } from "react";
import userService from "../services/user.service";
import IUser from '../types/user.type';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from 'antd';
import React from 'react';
import { Button, Input } from "antd";
import UserModal from "../add-edit.user.modal";
import ICreateUser from '../types/create-user.type';

type Props = {};
type State = {
    users: Array<ICreateUser>,
    selectedUser: IUser | null,
    selectedIndex: number,
    searchTitle: string,
    isEditing: boolean,
    isAdded: boolean,
    addModalOpen: boolean,
    login: string;
    password: string;
    firstName: string;
    secondName: string;
    lastName: string;
    phone: string;
    position: string;
    role: string;

};

class Admin extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            users: [],
            selectedUser: null,
            selectedIndex: -1,
            searchTitle: "",
            isEditing: false,
            isAdded:false,
            addModalOpen:false,
            login: "",
            password: "",
            firstName: "",
            secondName: "",
            lastName: "",
            phone: "",
            position: "",
            role: ""
        }
    };

    columns = [
        {
            key: "1",
            title:"№ пп",
            dataIndex:"id"
        },
        {
            key: "2",
            title:"Фамилия",
            dataIndex:"lastName"
        },
        {
            key: "3",
            title:"Имя",
            dataIndex:"firstName"
        },
        {
            key: "4",
            title:"Отчество",
            dataIndex:"secondName"
        },
        {
            key: "5",
            title:"Должность",
            dataIndex:"position"
        },
        {
            key: "6",
            title:"Телефон",
            dataIndex:"phone"
        },
        {
            key: "7",
            title:"Логин",
            dataIndex:"login"
        },
        {
            key: "8",
            title:"Статус",
            dataIndex:"status"
        },
        {
            key: "9",
            title:"Действия",
            render: (user: IUser) =>{
                return(
                    <>
                    <EditOutlined
                        onClick={()=>{
                            this.onEditUser(user);
                        }}
                    />
                    <DeleteOutlined
                        onClick={()=>{
                            this.onDeleteUser(user);
                        }}
                        style={{color:"red", marginLeft: 12}}
                    />
                    <Switch defaultChecked style={{marginLeft: 12}}></Switch>
                    </>
                )
            }
        },
    ];
    
    onEditUser(user: IUser) {
       this.setState({
            selectedUser: user,
            isEditing: true,
            addModalOpen: true
       });
        
    };
    
    resetEditing(){
        this.setState({
            selectedUser: null,
            isEditing: false
       });
    };
    
    onDeleteUser(user: IUser) {
       Modal.confirm({
            title:"Вы действительно хотите удалить пользователя",
            okText:"Удалить",
            cancelText:"Отмена",
            okType:"danger",
            onOk:()=>{
                console.log(user.id);
                userService.deleteUser(user.id);
                this.refreshUsers();
            }
       })
    };

    componentDidMount(){
        this.getAllUsers();
    }

    onAddUser(){
      this.setState({
        addModalOpen: true,
        isAdded: true,
        isEditing: false,
        selectedUser: null
      })
    }
    addUser(){
      const user = {} as ICreateUser;
      user.firstName = this.state.firstName;
      user.secondName = this.state.secondName;
      user.lastName = this.state.lastName;
      user.login = this.state.login;
      user.password = this.state.password;
      user.phone = this.state.phone;
      user.position = "Администратор безопасности";
      user.role = "syperadmin";
      console.log(user.firstName);
      if(this.state.isAdded === true){
      console.log("added");
      const arr = this.state.users;
      arr.push(user);
      console.log(arr);
      this.setState({...this.state, users: arr})
       // userService.createUser(user);
      }

      else if(this.state.isEditing === true){
        const users1 = this.state.users;
        const newUsers = users1.map(obj=>{
          if(obj.login === this.state.selectedUser?.login)
            obj = user;
        });
        this.setState({...this.state, users: newUsers as unknown as ICreateUser[]})
      }
      
       //userService.updateUser(user);
      
      this.setState({
        addModalOpen: false,
        isAdded: false,
        isEditing: false,
        selectedUser: null
      })
    }

    getAllUsers(){
        userService.getAllUsers()
            .then(responce => {
                this.setState({...this.state,
                    users: responce.data
                });
                console.log("data - " + responce.data);
        })
        .catch((e:Error)=>{
            console.log(e);
        })
    }
    
    refreshUsers(){
        this.getAllUsers();
    }

    deleteUser(index: number){
        userService.deleteUser(index);
    }

    handleChange(event: any){
      this.setState({...this.state, [event.currentTarget.name]: event.currentTarget.value});
    }

    render(){
        return(
            <Space direction="vertical" size="middle" style={{display:'flex'}}>
                <Button onClick={()=>{this.setState({isAdded: true, addModalOpen: true})}}>Добавить пользователя</Button>
                
                <Table columns={this.columns} dataSource={[...this.state.users]} ></Table>
                <Modal okText="Создать" cancelText="Отмена" title="Создание пользователя АПК КНО" centered open={this.state.addModalOpen} onCancel={()=>this.cancelEdit()} onOk={()=>this.addUser()}>
                <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        
        <Form.Item label="Фамилия">
          <Input name="lastName" onChange={this.handleChange} defaultValue={this.state.selectedUser?.lastName}/>
        </Form.Item>
        <Form.Item label="Имя">
          <Input name="firstName" onChange={this.handleChange} defaultValue={this.state.selectedUser?.firstName} />
        </Form.Item>
        <Form.Item label="Отчество">
          <Input name="secondName" onChange={this.handleChange} defaultValue={this.state.selectedUser?.secondName}/>
        </Form.Item>
        <Form.Item label="Телефон">
          <Input name="phone" onChange={this.handleChange} defaultValue={this.state.selectedUser?.phone} />
        </Form.Item>
        <Form.Item label="Логин">
          <Input name="login" onChange={this.handleChange} defaultValue={this.state.selectedUser?.login}/>
        </Form.Item>
        <Form.Item label="Пароль">
          <Input name="password" onChange={this.handleChange} defaultValue={this.state.selectedUser?.password}/>
        </Form.Item>
        <Form.Item label="Должность">
          <Select  defaultValue={this.state.selectedUser?.position}>
            <Select.Option value="1">Специалист</Select.Option>
            <Select.Option value="2">Ведущий специалист</Select.Option>
            <Select.Option value="3">Начальник подразделения</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Подразделение">
          <TreeSelect
            treeData={[
              { title: 'Минск', value: 'light', children: [{ title: 'Главное управление', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox>Администратор безопасности</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Администратор</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Администратор АПК КНО</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Пользователь</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Контролер</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>Аудитор</Checkbox>
        </Form.Item>
      </Form>

                </Modal>
                </Space>

        );
    }

    cancelEdit(): void {
        this.setState({
            addModalOpen: false
        })
    }
}
export default Admin;