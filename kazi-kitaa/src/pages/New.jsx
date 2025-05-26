import { useState } from "react";
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderNav from "./Header";



export default function NewScreen(){
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const handleChange = (event)=>{
        setInputs({
            ...inputs,
            [event.target.name] : event.target.value
        })
    }

    const handleData = (event)=>{
        event.preventDefault();
        

        navigate('/jobs');
        
    }

    return (
        <>
        <HeaderNav></HeaderNav>
            <div className="new-body">
                <div className="new-card">
                    <form action="" method="post" className="hero-content">
                        <h4>Create new job</h4>
                        <input 
                            type="text" 
                            name="region" 
                            onChange={ handleChange }
                            id="" 
                            placeholder="Mkoa" 
                            className="form-input"
                        />
                        <input 
                            type="text" 
                            name="category" 
                            onChange={ handleChange }
                            id="" 
                            placeholder="Category" 
                            className="form-input"
                        />
                        <input 
                            type="text" 
                            name="description" 
                            onChange={ handleChange }
                            id="" 
                            placeholder="Maelezo" 
                            className="form-input"
                        />
                        <input 
                            type="text" 
                            name="payments" 
                            onChange={ handleChange }
                            id="" 
                            placeholder="Malipo" 
                            className="form-input"
                        />
                        <input 
                            type="date" 
                            name="deadline" 
                            onChange={ handleChange }
                            id="" 
                            placeholder="Mwisho wa kazi" 
                            className="form-input"
                        />
                        <button type="submit" className='search-btn' onClick={ handleData }>Tunza</button>
                    </form>
                </div>
            </div>
        </>
    );
}