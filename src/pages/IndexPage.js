import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://13.49.60.104:4000/post/').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}

// import Post from "../Post";
// import { useEffect, useState } from "react";
// import axios from 'axios'; // Import Axios

// export default function IndexPage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Use Axios for the request
//     axios.get('http://localhost:4000/post')
//       .then(response => {
//         // Assuming the response contains data property that is an array of posts
//         setPosts(response.data);
//       })
//       .catch(error => {
//         // Handle any errors here
//         console.error('Axios Error:', error);
//       });
//   }, []);

//   return (
//     <>
//       {posts.length > 0 && posts.map(post => (
//         <Post key={post.id} {...post} /> // Assuming there is an "id" property in the post data
//       ))}
//     </>
//   );
// }
