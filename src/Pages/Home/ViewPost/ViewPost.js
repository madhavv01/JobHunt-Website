import React, { useContext, useState, useEffect } from "react";
import ViewPostCard from "./ViewPostCard";
import { AuthContext } from "../../../AuthProvider";
import { ref, get, child } from "firebase/database";
import { database } from "../../../firebase.config";
import "./vp.css";

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `jobs`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(
            Object.keys(snapshot.val()).map((k) => ({
              _id: k,
              jobBenefits: null,
              ...snapshot.val()[k],
            }))
          );
          setPosts(
            Object.keys(snapshot.val()).map((k) => ({
              _id: k,
              jobBenefits: null,
              ...snapshot.val()[k],
            }))
          );
        } else {
          console.log("No data available");
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.email]);

  return (
    <div className="view-post">
      <h3>View Posts</h3>
      <div className="posts-container">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <ViewPostCard post={post} key={post._id} />)}
      </div>
    </div>
  );
};

export default ViewPost;
