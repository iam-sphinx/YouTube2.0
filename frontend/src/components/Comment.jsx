import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Button = styled.button`
  padding: 2px 10px;
  background-color: transparent;
  border: 1px solid #c70039;
  color: #c70039;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Comment = ({ comment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const [channel, setChannel] = useState({});
  const deleteComment = useCallback(async () => {
    await axios.delete(`/comments/${comment._id}`);
  });
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId, deleteComment]);

  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel?.name} <Date>{format(comment?.createdAt)}</Date>
        </Name>
        <Text>{comment?.desc}</Text>
      </Details>
      {(comment.userId === currentUser._id ||
        currentVideo.userId === currentUser._id) && (
        <Button onClick={deleteComment}>Delete</Button>
      )}
    </Container>
  );
};

export default Comment;
