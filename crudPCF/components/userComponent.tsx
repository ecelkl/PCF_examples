import * as React from "react";
import {useState} from 'react'
import * as ReactDOM from "react-dom";

interface IMyReactComponentProps {}
const userComponent: React.FC<IMyReactComponentProps> = () => {

     function  myFunction(e:any){
         e.preventDefault()
        alert("Test Button")

    }
    return (

        
            <div className="form">
            <form>
            <div className="input-container">
                <label>Username </label>
                <input type="text" name="uname"  />
            </div>
            <div className="input-container">
                <label>Salary </label>
                <input type="text" name="salary"  />
            </div>
            <div className="input-container">
                <label>Phone </label>
                <input type="text" name="phone"  />
            </div>
            <div className="input-container">
                <label>City </label>
                <input type="text" name="city"  />
            </div>
            <div className="input-container">
                <label>Country </label>
                <input type="text" name="country"  />
            </div>
            <br></br>
         
            </form>
            <div className="button-container">
                <button onClick={myFunction} >Submit Button </button>
            </div>
        </div>
        
        
        
      );

};

export default userComponent;