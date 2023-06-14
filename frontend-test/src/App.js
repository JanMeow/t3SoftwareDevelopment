// import logo from './logo.svg';
import React, {Component} from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';

import 'tachyons'
  
// --------------------------------------------------------------------------------------------------------------------
// major take away about how to use hook and the delay between setState and console.log()

class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      click:0,
      imageUrl: '',
      box:{},
      route: 'SignIn',
      isSignedIn: false
    }
  }
  
  componentDidMount(){
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log)
  }

  calculateFaceLocation = (result)=>{

    const getBoundingBoxInfo =() =>{

      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height)*800/width;
      const box = [];


      for (const element of result.outputs[0].data.regions){
        const Info = element.region_info.bounding_box

        const corners = {}
        corners.leftcol = Info.left_col * width;
        corners.toprow = Info.top_row * height;
        corners.rightcol = width - (Info.right_col * width);
        corners.btmrow = height - (Info.bottom_row * height);
        box.push(corners)
      }
      return box
    }
    this.setState({box:getBoundingBoxInfo()},
    ()=>console.log(this.state.box))
  }
    

  onButtonSubmit = (event)=>{
    console.log('Submited!')
    this.setState(
      {imageUrl: this.state.input},
      ()=>{
        <div>
          {console.log('imageURL is :' + this.state.imageUrl)},
          {predictFromURL(this.state.imageUrl)},
        </div>})
    this.setState({input: ''})
    
    const predictFromURL = (url)=>{

      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = 'a33072cb641343a0a748bb2f9daf063a';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'clarifai';       
      const APP_ID = 'main';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
      const IMAGE_URL = url;
    
      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////
    
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
    
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      
      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
          .then(response=>response.json())
          .then(result => this.calculateFaceLocation(result))
          .catch(error => console.log('error', error));
    }
  }
    

  handleClick = ()=>{
    this.setState({click:this.state.click +1})
    console.log(`YOU CLICK ME !!!! Now ${this.state.click} `)
    
  }
  onInputChange = (event)=>{
    this.setState({input: event.target.value})
    }
  
  onRouteChange = (route)=>{
    this.setState({route: route})
  }



//   render(){
//     return (
//       <div className="App">
//         <ParticlesBg type="thick" bg={true}/>
//         <Navigation onRouteChange = {this.onRouteChange}/>
//         {this.state.route === 'SignIn'
//         ?<SignIn onRouteChange= {this.onRouteChange}/>
//         :<div>        
//           <Logo/>
//           <Rank/>
//           <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
//           <button className='center f4' onClick={this.handleClick}>Submit Here ! Meow {this.state.click} !</button>
//           <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl}/>
//         </div>}
//       </div>
//     )
//   }
// }


  render(){
    let content;
    switch(this.state.route){
      case 'home':
        content =
          <div>        
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <button className='center f4' onClick={this.handleClick}>Submit Here ! Meow {this.state.click} !</button>
            <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>;
        break;
      case 'register':
        content =<Register onRouteChange = {this.onRouteChange}/>
        break;
      default:
        content =<SignIn onRouteChange= {this.onRouteChange}/>
        break;
    }


    return (
      <div className="App">
        <ParticlesBg type="thick" bg={true}/>
        <Navigation onRouteChange = {this.onRouteChange}/>
        {content}
      </div>
    )
  }
}
export default App;