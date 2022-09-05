import { Component, PropsWithChildren } from "react";
import userService from "../services/user.service";
import IUser from '../types/user.type';

type Props = {};
type State = {
    users: Array<IUser>,
    selectedUser: IUser | null,
    selectedIndex: number,
    searchTitle: string
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
            searchTitle: ""
        }
    };

    headers: { key: string; label: string }[] = [
        { key: "id", label: "№ пп" },
        { key: "last_name", label: "Фамилия" },
        { key: "first_name", label: "Имя" },
        { key: "second_name", label: "Отчество" },
        { key: "position", label: "Должность" },
        { key: "phone", label: "Контактный телефон" },
        { key: "login", label: "Логин" },
        { key: "status", label: "Статуст" },
        { key: "actions", label: "Действия" },
      ];

    componentDidMount(){
        this.getAllUsers();
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
        const data = userService.getAllUsers;
        return(
            <table>
                <thead>
                    <tr>
                        {this.headers.map((row) => {
                            return(
                                <td key={row.key}>{row.label}{" "}</td>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {this.state.users.map(user=>{
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.lastName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.secondName}</td>
                                <td>{user.position}</td>
                                <td>{user.phone}</td>
                                <td>{user.login}</td>
                                <td></td>
                                <td>Keys</td>
                            </tr>
                            
                        );
                    })}
                </tbody>
            </table>
        );
    }
}
export default Admin;