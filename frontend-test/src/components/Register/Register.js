import react from 'react';
import './Register.css'


class Register extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }

    }

    onEmailChange = (event)=>{
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event)=>{
        this.setState({registerPassword: event.target.value})
    }

    onNameChange = (event)=>{
        this.setState({registerName:event.target.value})
    }

    onSubmitRegister = ()=>{
        this.props.onRouteChange('home')
        console.log('new user created !')
        console.log(this.state.registerEmail, this.state.registerPassword)
        fetch('http://localhost:3000/register',
        {
            method: 'post',
            headers: {'content-type': 'registration/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        }).then(response =>{
            response.json()
        }).then(data =>console.log(data))
    }

    render(){
        return(
            <div className=" container">
                <form className="child measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 underline fw5 ph0 mh0 white ">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Name</label>
                        <input 
                        onChange = {this.onNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-pink hover-white w-100" 
                        type="email" 
                        name="name"  
                        id="name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                        <input 
                        onChange = {this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-pink hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                        <input 
                        onChange = {this.onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-pink hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"/>
                    </div>
                    <div className="">
                        <input 
                        onClick = {this.onSubmitRegister}
                        className="b white center ph3 pv2 input-reset ba b--white b--dashed bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register !"/>
                    </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Register;