import { Component, PropsWithChildren } from "react";

type Props = {};
type State = {};
class Admin extends Component<Props, State>{

    headers: { key: string; label: string }[] = [
        { key: "id", label: "ID" },
        { key: "first_name", label: "First name" },
        { key: "last_name", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "gender", label: "Gender" },
        { key: "ip_address", label: "IP address" },
      ];

    render(){
        data = 
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
                    {}
                </tbody>
            </table>
        );
    }
}
export default Admin;