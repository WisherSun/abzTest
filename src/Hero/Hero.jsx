import Button from '../Button.jsx'
import styles from './Hero.module.css'

function Hero (){
    return <div className = {styles.hero__container}>
        <div className = {styles.hero__info}>
            <h1>Test assignment for front-end developer</h1>
            <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <Button buttonName ="Sing Up"/>
        </div>
    </div>    
    
}

export default Hero