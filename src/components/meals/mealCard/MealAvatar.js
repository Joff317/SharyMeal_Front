import React, { useState, useEffect } from 'react';
import { API } from '../../../utils/variables';
import avatarDefault from './avatar-default.png'

function MealAvatar({host}) {

    const [ hostDetails, setHostDetails ] = useState(null)

    useEffect(() => {
        fetch(API + `/user_detail/${host.id}`)
        .then(res => res.json())
        .then(data => {
            console.log('data MealAvatar => ', data);
            setHostDetails(data);
        })
    }, [])


    return (
        <div>
            {
                hostDetails && hostDetails.avatar_url ?
                        <img src={hostDetails.avatar_url} alt="host"/>
                        :
                        <img src={avatarDefault} alt="host" className='w-24'/>
            }
        </div>
    );
}

export default MealAvatar;