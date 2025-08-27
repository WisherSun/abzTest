import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Button from '../Button.jsx'
import styles from './GetSection.module.css'

function GetSection(){
    
    const [users, setUsers] = useState([])
    const [usersPerList, setUsersPerList] = useState(6)

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=2&count=10',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(function (response) {
                setUsers(response.data.users)
                console.log(response.data.users)
            })
    }, [])

    const handleShowMore = () => {
        setUsersPerList(users => users + 6);
    }

    const checkLength = (item) => {
        return item.length > 30 ? item.slice(0, 30) + '...' : item
    }
    
    return <div className={styles.get__container}>
        <h1>Working with GET request</h1>
            <div className={styles.get__users}>
                {users.slice(0, usersPerList).map((item) => {
                return <div  
                className={styles.get__user} key={item.id}>
                <img className={styles.get__img} src={item.photo} />
                <p>{checkLength(item.name)}</p>
                <p>{checkLength(item.position)}<br/>{checkLength(item.email)}<br/>{item.phone}</p>
            </div>
        })}</div>

    {usersPerList < users.length ?
        <Button 
        width='120px'
        buttonName ="Show more"
        onClickFunction = {handleShowMore}/>
        : null
    }
        </div>    
        
}

export default GetSection
