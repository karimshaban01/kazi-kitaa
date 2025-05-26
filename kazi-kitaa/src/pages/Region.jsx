import { useState } from 'react'
import '../App.css'
import HeaderNav from './Header';

/* fetch('http://172.17.0.1/cf/regions.php')
.then(response => response.json())
.then(data = () => {
    console.log(data);
})
.catch(err => {
    console.log(err);
}); */

function RegionScreen (){
    const regions = [
        'Mikoa yote', 'Arusha', 'Dar es Salaam',
        'Dodoma', 'Geita', 'Iringa', 'Kagera', 
        'Mwanza', 'Tanga', 'Zanzibar'
      ]

    return (
        <>
            <HeaderNav></HeaderNav>
            <div className='region-body'>
                <div className='regions-menu'>
                    {
                        regions.map((region, index)=>(
                            <div key={index} className='region-card'>
                                {region}
                            </div>
                        ))
                    }
                </div>

                <div className='job-section'>
                    <h1>
                        hello
                    </h1>
                </div>

            </div>
            
        </>
    );

}

export default RegionScreen