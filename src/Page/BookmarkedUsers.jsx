import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../css/user.css";

const BookmarkedUsers = () => {
  const [bookmarked, setBookmarked] = useState(
    JSON.parse(localStorage.getItem("bookmarkedUsers")) || []
  );
  const navigate = useNavigate();

  const handleUnbookmark = (user) => {
    const updatedBookmarks = bookmarked.filter((item) => item.id !== user.id);
    setBookmarked(updatedBookmarks);
    localStorage.setItem("bookmarkedUsers", JSON.stringify(updatedBookmarks));
  };

  return (
    <React.Fragment>
      <div className="userNavBar">
        <h2 className="userTitleNew">Bookmarked Users</h2>
        <Button
          className="bookmarkedBtn"
          variant="link"
          onClick={() => navigate("/")}
        >
          <h2>Back to Users</h2>
        </Button>
      </div>
      <Container className="userContainer">
        <Row>
          {bookmarked.length === 0 ? (
            <div className="noBookmarks">No bookmarked users found.</div>
          ) : (
            bookmarked.map((user) => (
              <Col lg={3} key={user.id}>
                <Card className="userCard">
                  <img
                    src={user.avatar_url}
                    alt="User Avatar"
                    className="userImg"
                  />
                  <div className="checkBoxdiv">
                    <div className="userTitle">{user.login}</div>
                    <div
                      className="bookmarkIcon"
                      onClick={() => handleUnbookmark(user)}
                    >
                      <FaStar className="starIcon filled" />
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default BookmarkedUsers;
