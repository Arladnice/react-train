import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServices from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostServices.getById(params.id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostServices.getCommentsByPostId(params.id);
    setComments(response.data);
  });
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  return (
    <div>
      <h1>Вы открыли страницу поста с id {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <div>
				<h1>Комментарии</h1>
        {isComLoading ? (
          <Loader />
        ) : (
          <div>
            {comments.map((comm) => (
              <div style={{ marginTop: 30 }} key={comm.id}>
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostIdPage;