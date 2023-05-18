import { Edit } from '@refinedev/antd'
import React, { useEffect } from 'react'
import { SessionAuth } from 'supertokens-auth-react/recipe/session'

const Profile: React.FC<any> = () => {
    // useEffect(() => {
    //     fetch('/api/userInfo')
    //         .then(res => res.json())
    //         .then(userInfo => {
    //             console.log('userInfo', userInfo);
    //         });
    // }, []);

    return (
        <SessionAuth>
            <Edit title='Update User Profile'>
                <h1>A place to update user</h1>
            </Edit>
        </SessionAuth>
    )
}

export default Profile;