// import {useEffect, useState} from "react";
// import {Navigate, useParams} from "react-router-dom";
// import Editor from "../Editor";
// import axiosInstance from "../axiosInstance";
// import { response } from "express";

// export default function EditPost() {
//   const {id} = useParams();
//   const [title,setTitle] = useState('');
//   const [summary,setSummary] = useState('');
//   const [content,setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect,setRedirect] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost/:4000/post/'+id)
//       .then(response => {
//         response.json().then(postInfo => {
//           setTitle(postInfo.title);
//           setContent(postInfo.content);
//           setSummary(postInfo.summary);
//         });
//       });
//   }, [id]);
//   // useEffect(() => {
   
//   //   // Fetch post data using Axios
//   //   axiosInstance.get(`/post/${id}`)
//   //     .then((response) => {
//   //       const postInfo = response.data;
//   //       setTitle(postInfo.title);
//   //       setSummary(postInfo.summary);
//   //       setContent(postInfo.content);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching post data:", error);
//   //     });
//   // }, [id]);

//   async function updatePost(ev) {
//     ev.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("summary", summary);
//     formData.append("content", content);
  
//     // Include the id as a URL parameter
//     const url = `/post/${id}`;
  
//     if (files?.[0]) {
//       formData.append("file", files?.[0]);
//     }
  
//     try {
//       // Update post using Axios with the correct URL
//       const response = await axiosInstance.put(url, formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       if (response.status === 200) {
//         setRedirect(true);
//       } else {
//         console.error("Update post failed");
//       }
//     } catch (error) {
//       console.error("Error during update:", error);
//     }
//   }
  
//   if (redirect) {
//     return <Navigate to={'/post/'+id} />
//   }

//   return (
//     <form onSubmit={updatePost}>
//       <input type="title"
//              placeholder={'Title'}
//              value={title}
//              onChange={ev => setTitle(ev.target.value)} />
//       <input type="summary"
//              placeholder={'Summary'}
//              value={summary}
//              onChange={ev => setSummary(ev.target.value)} />
//       <input type="file"
//              onChange={ev => setFiles(ev.target.files)} />
//       <Editor onChange={setContent} value={content} />
//       <button style={{marginTop:'5px'}}>Update post</button>
//     </form>
//   );
// }


import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import axiosInstance from "../axiosInstance"; // Import Axios

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Fetch post data using Axios
    axiosInstance.get(`http://13.49.60.104:4000/post/${id}`)
      .then((response) => {
        const postInfo = response.data;
        console.log(postInfo)
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("id", id);

    if (files?.[0]) {
      formData.append("file", files?.[0]);
    }

    try {
      // Update post using Axios
      const response = await axiosInstance.put(`/post/${id}`, formData, {
        withCredentials: true, // Send credentials if required
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });

      if (response.status === 200) {
        setRedirect(true);
      } else {
        console.error("Update post failed");
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
