import Button from '../Button.jsx'
import logo from '../assets/logo.png'
import styles from './Header.module.css'

function Header () {
    return(
        <div className={styles.header}>
            <div className={styles.header__container}>            
                <img src={logo} alt="logo" style={{height:'26px', width:'104px'}}/>       
                <div style={{display:'flex'}}>
                    <Button buttonName ="Users"/>
                    <Button buttonName ="Sing Up"/>
                </div>        
            </div>
        </div>
    )
}

export default Header