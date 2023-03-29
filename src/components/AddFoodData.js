import React, {useState} from 'react'
import './AddFoodData.css'

// Firebase imports
import { db, storage } from '../Firebase/FirebaseConfig'
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const AddFoodData = () => {

  const [foodName, setFoodName] = useState('')
  const [foodPrice, setFoodPrice] = useState('')
  const [foodCategory, setFoodCategory] = useState('')
  const [foodImage, setFoodImage] = useState(null)
  const [foodDescription, setFoodDescription] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [restaurantPhone, setRestaurantPhone] = useState('')
  // const [foodImageUrl, setFoodImageUrl] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    if (foodImage == null) {
      alert('Please select an image')
      return
    } else {
      const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
      uploadBytes(imageRef, foodImage)
      .then(()=>{
        
        alert('Image uploaded successfully')
        getDownloadURL(imageRef)
        .then((url)=>{
          // console.log(url)
          // setFoodImageUrl(url)

          const foodData = {
            foodName,
            foodPrice,
            foodCategory,
            foodImageUrl: url,
            foodDescription,
            restaurantName,
            restaurantAddress,
            restaurantPhone

          }
          // console.log(foodData);
          try{
            const docRef = addDoc(collection(db, "foodData"), foodData);
            alert("Data Added Successfully", docRef.id);
          }
          catch(error){
            alert(error);
          }

        })
      })
        
      .catch((error)=>{
        alert(error)
      })
    }



    
  }


  return (
    <div className='form-outer'>
      <h1>Add Food Details</h1>
      <form className='form-inner'> 
      <label>Food Name</label>
      <input type="text" name="food_name" 
      onChange={(e) => {setFoodName(e.target.value)}} />
      <br />
      <label>Food Description</label>
      <input type="text" name="food_description" 
      onChange={(e) => {setFoodDescription(e.target.value)}} />
      <br />
      <label>Food Price</label>
      <input type="number" name="food_price" 
       onChange={(e) => {setFoodPrice(e.target.value)}} />
      <br />
      <label>Food Category</label>
      <input type="text" name="food_category" 
      onChange={(e) => {setFoodCategory(e.target.value)}} />
      <br />
      <label>Food Image</label>
      <input type="file" name="food_image" 
      onChange={(e) => {setFoodImage(e.target.files[0])}} />
      <br /> 
      <label>Restaurant Name</label>     
      <input type="text" name="restaurant_name" 
      onChange={(e) => {setRestaurantName(e.target.value)}} />
      <br />
      <label>Restaurant Address</label>
      <input type="text" name="restaurant_name" 
      onChange={(e) => {setRestaurantAddress(e.target.value)}} />
      <br />
      <label>Restaurant Phone</label>
      <input type="number" name="restaurant_phone" 
      onChange={(e) => {setRestaurantPhone(e.target.value)}} />
      <br />
      <button onClick={handleSubmit}>Add Food</button>

      

      </form>
    </div>
  )
}

export default AddFoodData