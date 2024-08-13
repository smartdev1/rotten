// "use client"

// import React from 'react'
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// function profil() {
//   const [comments, setComments] = useState([]);
//   const router = useRouter();
//   const userId = "59b99dbbcfa9a34dcd7885c4"

//   useEffect(() => {
//     const fetchComments = async () => {
//       const response = await fetch(`/api/comments?user_id=${userId}`);
//       const data = await response.json();
//       setComments(Array.isArray(data.comments) ? data.comments : []);
//     };

//     fetchComments();
//   }, [userId]);

//   const handleDelete = async (commentId: string) => {
//     try {
//       const response = await fetch(`/api/comments/${commentId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setComments(comments.filter((comment) => comment._id !== commentId));
//       } else {
//         console.error("Erreur lors de la suppression du commentaire");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du commentaire", error);
//     }
//   };


//   return (
//     <div>
//         <h1>Mon Profil</h1>
//         <h2>Mes commentaires</h2>
//         <ul>
//             {comments.map((comment) => (
//                 <li key={comment._id}>{comment.comment}             <button onClick={() => handleDelete(comment._id)}>Supprimer</button></li>
                
//             ))}
//         </ul>
//     </div>
//   )
// }

// export default profil