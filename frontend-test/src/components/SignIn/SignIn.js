import React from 'react'
import './SignIn.css'



// To recap, the major difference between props and state is that 
// state is handled within the component while props is something (almost like an input) you pass onto an component
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event)=>{
        this.setState({signInEmail: event.target.value})
    }

    onSignInChange = (event)=>{
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = ()=>{
        let isValid = false;
        // by default fetch uses get method but we want to post to not put credentials on the header
        fetch('http://localhost:3000/signin',
        {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => {
            if (response.status !== 400){
                return true}else{
                    return false
                }})
        .then(()=>{isValid = true})
        .then(this.props.onRouteChange('home'))
        
    }
        
    
    onSubmitRegister = () =>{
        this.props.onRouteChange('register')
    }
    render(){
            return(
                <div className=" container">
                    <form className="child measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 underline fw5 ph0 mh0 white ">Sign In</legend>
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
                            onChange = {this.onSignInChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-pink hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"/>
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer white"><input type="checkbox"/> Remember me</label>
                        <br></br>
                        <br></br>
                        <div className="">
                            <input 
                            onClick = {this.onSubmitSignIn}
                            className="b white center ph3 pv2 input-reset ba b--white b--dashed bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                        </div>
                        <div className=" mt3">
                            <input 
                            onClick = {this.onSubmitRegister}
                            className="b white center ph3 pv2 input-reset ba b--white b--dashed bg-transparent grow pointer f6 dib"
                            type = 'submit'
                            value = 'Sign up'/>
                        </div>
                        </fieldset>
                    </form>
                </div>
            )
        
    }
}

export default SignIn