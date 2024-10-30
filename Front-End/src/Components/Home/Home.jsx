import axios from "axios";
import { useEffect, useState } from "react";
import NavCom from "../NavCom/NavCom";
import Footer from "../Footer/Footer";
import HomePosts from "./HomePosts/HomePosts";

const Home = () => {
    const [posts, setposts] = useState([]);
    const [user, setuser] = useState({})
    useEffect(()=>{
        axios.get('http://localhost:3000/post',{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data.data.post);
            setposts(res.data.data.post);
        })
        .catch(err => console.log(err));
        axios.get('http://localhost:3000/user',{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data.data);
            setuser(res.data.data)
        })
        .catch(err => console.log(err));

    },[]);

   

    return (
      <>
        <NavCom data={user} />
        <HomePosts posts={posts} />
        <Footer />
      </>
    );
  }
  
  export default Home
  