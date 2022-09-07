import { Cascader, DatePicker, Form, InputNumber, Modal, Radio, Select, Switch, TreeSelect } from "antd";
import { Component, PropsWithChildren } from "react";
import userService from "../services/user.service";
import IUser from '../types/user.type';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from 'antd';
import React from 'react';
import { Button, Input } from "antd";
import UserModal from "../add-edit.user.modal";

type Props = {};
type State = {
    users: Array<IUser>,
    selectedUser: IUser | null,
    selectedIndex: number,
    searchTitle: string,
    isEditing: boolean,
    addModalOpen: boolean
};

class Admin extends Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.refreshUsers = this.refreshUsers.bind(this);
        this.state = {
            users: [],
            selectedUser: null,
            selectedIndex: -1,
            searchTitle: "",
            isEditing: false,
            addModalOpen:false
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
                    <Switch style={{marginLeft: 12}}></Switch>
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
                userService.deleteUser(user.id);
                this.refreshUsers();
            }
       })
    };

    componentDidMount(){
        this.getAllUsers();
    }

    addUser(){

    }

    getAllUsers(){
        userService.getAllUsers()
            .then(responce => {
                this.setState({
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

    render(){
        return(
            <div>
                <Button onClick={()=>{this.addUser();}}>Добавить пользователя</Button>
                <Table columns={this.columns} dataSource={this.state.users}></Table>
                <Modal centered open={this.state.addModalOpen} onCancel={()=>this.cancelEdit()} onOk={()=>this.addUser}>
                <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>

                </Modal>
            </div>

        );
    }

    cancelEdit(): void {
        this.setState({
            addModalOpen: false
        })
    }



}
export default Admin;