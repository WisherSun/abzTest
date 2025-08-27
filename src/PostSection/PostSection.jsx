import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Button from '../Button.jsx'
import styles from './PostSection.module.css'

function PostSection(){
    const [positions, setPositions] = useState([])
        useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(function (response) {
                setPositions(response.data.positions)
                console.log(response.data.positions)                
            })
    }, [])
    
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      position_id: 0,
      photo: ''
    });

  const handleChange = (e) => {
  const { name, type, value, files } = e.target;

  setFormData((data) => ({...data, [name]: type === 'file' ? files[0] : name === 'position_id' ? parseInt(value, 10) : value }));
  };
    

  const handleSubmit = async () => {
    try {
    
      const tokenResponse = await axios.post(
        'https://frontend-test-assignment-api.abz.agency/api/v1/token',
        {},
       { headers: { 'accept': 'application/json' } }
      );
      const token = tokenResponse.data.token;
      console.log(token)
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('position_id', formData.position_id);
    data.append('photo', formData.photo);
    console.log(data)

    const response = await axios.post(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
  
  }    
    return <div className={styles.post__container}>
    <h1>Working with POST request</h1>
        
        <input
        className={styles.post__input}
        type='text'
        name='name'
        placeholder='Your name'
        value={formData.name}
        onChange={handleChange}
      />

      <input 
      className={styles.post__input}
      type='email'
      name='email'
      placeholder='Email'
      value = {formData.email}
      onChange={handleChange}
      />

      <input 
      className={styles.post__input}
      type='tel'
      name='phone'
      placeholder='Phone'
      value = {formData.phone}
      onChange={handleChange}
      />
      <p className={styles.post__input_example}>+38 (XXX) XXX - XX - XX</p>
    
    <div 
      className={styles.post__radio}>
      <p>Select your position</p>
      {positions.map((position)=>{
    return <label>
      <input 
      
      type='radio'
      name='position_id'
      value = {position.id}
      onChange={handleChange}
      />
      {position.name}
    </label>
  })
  }
  </div>
    <div className={styles.post__load_photo}>
        <label className={styles.post__load_photo_button}>
            <input
                className={styles.post__hiddenInput}
                type='file'
                name ='photo'
                accept='image/*'
                onChange={handleChange}
            />    
                Upload
        </label>
        <p className={styles.post__load_photo_button_value}>
            {formData.photo == '' ? 'Upload your photo' : formData.photo.name.length > 20 ? formData.photo.name.slice(0, 20) : formData.photo.name}
        </p>
  </div>
        
        <Button 
        onClickFunction = { formData.name == '' || formData.email == '' || formData.category == '' || formData.number == '' ? ()=> {alert("Please fill in all fields!")} : handleSubmit}
        buttonName ='Sign Up'
        color = { formData.name == '' || formData.email == '' || formData.category == '' || formData.number == '' ? 'rgba(180, 180, 180, 1)' : 'rgba(244, 224, 65, 1)'}/>
        </div>
            
}

export default PostSection
