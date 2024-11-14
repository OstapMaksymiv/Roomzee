import { useState,useRef } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import apiRequest from "../../library/apiRequest";
import UploadWidget from "../../components/uploadWidget/uploadWidget.jsx"
import "react-quill/dist/quill.snow.css";
import { useLoaderData, useNavigate } from "react-router-dom";
function NewPostPage() {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const posts = useLoaderData();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post('/posts',{
        postData:{
          title:inputs.title, 
          images,
          rooms:parseInt(inputs.rooms),
          homeType:inputs.homeType,
          propertyType:inputs.propertyType,
          price:parseInt(inputs.price),
          size: parseInt(inputs.size),
          address:inputs.address,
          webId: parseInt(inputs.size)
        },
        postDetail: {
          latitude:inputs.latitude,
          longitude: inputs.longitude,
          description:value,
          utilities:inputs.utilities,
          pet:inputs.pet    
        }
      })
      navigate("/rooms/" + res.data.id)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input placeholder="Title" required id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input placeholder="Price" min={0} required id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input placeholder="Address" required id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill   required ref={quillRef} theme="snow" onChange={setValue} value={value} />
            </div>

   
   
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input placeholder="Latitude" required id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input placeholder="Longitude" required id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select required name="propertyType">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select required name="homeType">
                <option value="room">Room</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select required name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select required name="pet">
                <option value="allowed">Allowed</option>
                <option value="not_allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input placeholder="Size" min={0} required id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="rooms">Amount of Rooms</label>
              <input placeholder="Rooms" required min={0}  id="rooms" name="rooms" type="number" />
            </div>
            <button className="sendButton">Add Post</button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "dg9zhqqmq",
              uploadPreset: "estate",
              folder: "posts",
            }}
            setState={setImages}
          />
        <div className="posts_img">
          {images.map((image, index) => (
            <img src={image} key={index} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;