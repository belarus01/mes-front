import { Component, PropsWithChildren } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
type Props = {};
type State = {};
export default class Login extends Component<Props, State>{
    validationSchema() {
        return Yup.object().shape({
          login: [Yup Schema],
          password: [Yup Schema],
        });
      }

      handleLogin(formValue: { login: string; password: string }) {
        const { login, password } = formValue;
      }

    render(){
        const { loading, message } = this.state;
        const initialValues = {
            login: "",
            password: "",
        };
        <Formik 
            initialValues={initialValues} 
            validationSchema={this.validationSchema} 
            onSubmit={this.handleLogin}
        >
            
        </Formik>
        return(
           
        );
    }
}
