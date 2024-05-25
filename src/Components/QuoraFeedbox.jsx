import { Avatar, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./QuoraFeedBox.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatOutlined,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import ReactModal from "react-modal";
import {
  selectQuestionId,
  selectQuestionName,
  setQuestionInfo,
} from "../features/counter/questionSlice";
import { auth } from "../firebase";
import db from "../firebase";
import { selectUser } from "../features/counter/userSlice";
import firebase from "firebase/compat/app";

function QuoraFeedbox(props) {
  const [open, setOpen] = useState(false);
  const [AnswerVal, setAnswerVal] = useState("");
  const [InputUrl, setInputUrl] = useState("");
  const [GetAnswer, setGetAnswer] = useState([]);
  const dispatch = useDispatch();
  const questionId = useSelector(selectQuestionId);
  const questionName = useSelector(selectQuestionName);
  const user = useSelector(selectUser);

  const [Like, setLike] = useState(false);
  const [LikeCount, setLikeCount] = useState(props.postLike);

  const handleLike = () => {
    if (questionId) {
      if (!Like) {
        setLike(true);
        setLikeCount(LikeCount + 1);
        db.collection("question")
          .doc(questionId)
          .update({
            postLike: firebase.firestore.FieldValue.increment(1),
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        setLike(false);
        setLikeCount(LikeCount - 1);
        db.collection("question")
          .doc(questionId)
          .update({
            postLike: firebase.firestore.FieldValue.increment(-1),
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    }
  };

  useEffect(() => {
    if (questionId) {
      db.collection("question")
        .doc(questionId)
        .collection("answer")
        .onSnapshot((querySnapshot) => {
          const AnswerData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            answer: doc.data(),
          }));
          setGetAnswer(AnswerData);
        });
    }
  }, [questionId]);

  const modalSave = (e) => {
    e.preventDefault();
    if (AnswerVal !== "") {
      if (questionId) {
        db.collection("question").doc(questionId).collection("answer").add({
          answer: AnswerVal,
          timeStamp: firebase.firestore.Timestamp.now(),
          questionId: props.id,
          userId: user.uid,
          displayName: user.displayName,
          userImg: user.photo,
        });
        setAnswerVal("");
        document.getElementById("quora").style.filter = "blur(0px)";
        setOpen(false);
      }
    } else {
      alert("Please enter your answer");
    }
  };

  const answerBtn = () => {
    document.getElementById("quora").style.filter = "blur(8px)";
    setOpen(true);
  };

  const modalCancel = () => {
    document.getElementById("quora").style.filter = "blur(0px)";
    setOpen(false);
  };

  return (
    <div
      className="Profile-FeedBox"
      onClick={() => {
        dispatch(
          setQuestionInfo({
            questionId: props.id,
            questionName: props.question,
          })
        );
      }}
    >
      <div className="profile-info">
        <Avatar src={props.userImg} />
        <div className="profile-info-text">
          <h5>{props.displayname}</h5>
        </div>

        <div className="time">
          <p>{new Date(props.PostTime?.toDate()).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="Question-feedbox">
        <h3>{props.question}</h3>
        <button onClick={answerBtn}>Answer</button>
      </div>
      <div className="post__answer">
        {GetAnswer.map(({ id, answer }) => (
          <div key={id} className="answer">
            {props.id === answer.questionId ? (
              <div>
                <div className="PostUser-Profile">
                  <img src={answer.userImg} alt="" />
                  <h5>{answer.displayName}</h5>
                  <p>
                    {answer.timeStamp
                      ? new Date(answer.timeStamp?.toDate()).toLocaleString()
                      : ""}
                  </p>
                </div>
                <p>{answer.answer}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      <div className="Feed-footer">
        <div className="vote">
          <div className="Upvote" onClick={handleLike}>
            <ThumbUpOutlined />
            <h4>{LikeCount}</h4>
          </div>
          <div className="break">|</div>
          <div className="Downvote">
            <ThumbDownOutlined />
          </div>
        </div>
        <div className="Share">
          <ShareOutlined />
        </div>
        <ReactModal
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
          }}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: "60%",
              height: "60%",
              backgroundColor: "#c92c92",
              zIndex: "1000",
              top: "20%",
              left: "24%",
            },
            content: {
              WebkitOverflowScrolling: "touch",
              overflow: "auto",
              outline: "none",
              margin: "-20px",
            },
          }}
        >
          <div className="modal-ans">
            <h3>Write your answer</h3>
            <input
              required
              type="text"
              value={AnswerVal}
              onChange={(e) => {
                setAnswerVal(e.target.value);
              }}
              placeholder="Start your writing"
            />
            <input
              type="link"
              value={InputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
              }}
              placeholder="Enter image link"
            />
          </div>
          <div className="modal-btn">
            <button onClick={modalCancel}>Cancel</button>
            <button type="submit" onClick={modalSave}>
              Save
            </button>
          </div>
        </ReactModal>
      </div>
    </div>
  );
}

export default QuoraFeedbox;
