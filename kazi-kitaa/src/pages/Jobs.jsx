import { useState } from 'react'
import '../App.css'
import HeaderNav from './Header';

const clickedCat = (event) => {
    event.preventDefault();
    alert()

}

function JobScreen (){
    const categories = [
        'Kazi zote',
        'IT & Software', 'Sales & Marketing', 'Education',
        'Healthcare', 'Construction', 'Hospitality',
      ]

    return (
        <>
            <HeaderNav></HeaderNav>
            <div className='region-body'>
                <div className='regions-menu'>
                    {
                        categories.map((category, index)=>(
                            <div key={index} className='region-card' onClick={ clickedCat }>
                                {category}
                            </div>
                        ))
                    }
                </div>

                <div className='job-section'>
                    <table>
                        <th>
                            <td>Job ID</td>
                            <td>Description</td>
                            <td>Location</td>
                            <td>Deadline</td>
                            <td>Action</td>
                        </th>
                    </table>
                        {
                            categories.map((job, index)=>(
                                <div key={index} className='job-card'>
                                    {job}
                                </div>
                            ))
                        }
                    
                </div>

            </div>
            
        </>
    );

}

export default JobScreen