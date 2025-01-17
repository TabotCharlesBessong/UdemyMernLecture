
import React, { Component } from 'react'
import Button from '../button/Button'
import FormInput from '../form-input/FormInput'
import './SignIn.scss'
import {auth, signInWithGoogle } from '../../firebase/firebase'

export default class SignIn extends Component {

  constructor(props){
    super(props)

    this.state = {
      email:'',
      password:''
    }
  }

  handleSubmit = async (e)=>{
    e.preventDefault()
    const {email,password} = this.state

    try {
      await auth.signInWithEmailAndPassword(email,password)
      this.setState({email:'' , password:''})
    } catch (error) {
      console.log('error',error);
    }
  }

  handleChange = (e)=>{
    const {value,name} = e.target
    this.setState({[name]:value})
  }
  render() {
    return (
      <div className='sign-in' >
        <h2>I already have an account </h2>
        <span> sign in with your email and password </span> 
        <form onSubmit={this.handleSubmit}  action="">
          <FormInput 
          type="email" 
          name='email' 
          label="email"
          value={this.state.email}  
          required 
          handleChange={this.handleChange}  />
          <FormInput 
          handleChange={this.handleChange} 
          type="password" 
          name='password' 
          label="password"
          value={this.state.password}  
          required  />
          <div className="buttons">
            <Button type='submit' > Sign In </Button>
            <Button onClick={signInWithGoogle} isGoogleSignIn > Sign In With Google </Button>
          </div>
          
        </form>
      </div>
    )
  }
}
