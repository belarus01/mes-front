import { Component, PropsWithChildren } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Admin from "./admin.component";

interface RouterProps {
  history: string;
}
type Props = {};
type State = {
  login:string,
  password:string,
  loading:boolean,
  message:string,
  redirect: boolean
};

export default class Login extends Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      login:"",
      password:"",
      loading: false,
      message:"",
      redirect: false
    };
  }

    validationSchema() {
      return Yup.object().shape({
        login: Yup.string().required("Данное поле обязательно для заполнения"),
        password: Yup.string().required("Данное поле обязательно для заполнения"),
      });
    }

    handleLogin(formValue: { login: string; password: string }) {
      const { login, password } = formValue;
      this.setState({
        message: "",
        loading: true
      });

      AuthService.login(login, password).then(()=>{
        window.location.href = "/admin";
       this.setState({
        redirect: true
       })
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage
        });
      });
    }
    
    render(){
        const { loading, message } = this.state;
        const initialValues = {
            login: "",
            password: "",
        };
        
        return(
        <div className="row">
        
          <div className="col-md-3"></div>
          <div className=" col-md-6 card card-container">
            <Formik 
              initialValues={initialValues} 
              validationSchema={this.validationSchema} 
              onSubmit={this.handleLogin}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="login">Логин</label>
                  <Field name="login" type="text" className="form-control" />
                <ErrorMessage
                  name="login"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Войти</span>
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              </Form>
            </Formik>
          </div>
          <div className="col-md-3"></div>
        </div>
        );
    }
}
