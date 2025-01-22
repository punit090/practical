import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";
import axios from "axios";
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from "react-icons/fa";
import "../css/user.css";

const User = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(
    JSON.parse(localStorage.getItem("bookmarkedUsers")) || []
  );
  const [refreshing, setRefreshing] = useState(false);
  const usersPerPage = 8;
  const navigate = useNavigate();

  const API_URL = "https://api.github.com/users";

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(async () => {
      await fetchData();
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedUsers", JSON.stringify(bookmarked));
  }, [bookmarked]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(data.length / usersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleBookmark = (user) => {
    if (bookmarked.some((item) => item.id === user.id)) {
      setBookmarked(bookmarked.filter((item) => item.id !== user.id));
    } else {
      setBookmarked([...bookmarked, user]);
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="userNavBar">
        <h2 className="userTitleNew">Users</h2>
        <Button className="bookmarkedBtn" variant="link" onClick={() => navigate("/bookmarks")}>
          <h2>Bookmarked Users</h2>
        </Button>
      </div>
      <Container className="userContainer">
        {refreshing && (
          <div className="refreshLoader">
            <Spinner animation="border"  role="status">
              <span className="visually-hidden">Refreshing...</span>
            </Spinner>
          </div>
        )}

        {!refreshing && (
          <>
            <Row>
              {currentUsers.map((user) => (
                <Col lg={3} key={user.id}>
                  <Card className="userCard">
                    <img
                      src={user.avatar_url}
                      alt="User Avatar"
                      className="userImg"
                    />
                    <div className="checkBoxdiv">
                      <div className="userTitle">{user.login}</div>
                      <div onClick={() => handleBookmark(user)} className="bookmarkIcon">
                        {bookmarked.some((item) => item.id === user.id) ? (
                          <FaStar className="starIcon filled" />
                        ) : (
                          <FaRegStar className="starIcon outlined" />
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="pagination">
              <Button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="previousBtn"
                style={{backgroundColor:"#000"}}
              >
                <FaChevronLeft />
              </Button>
              <span className="pageIndicator">
                {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="nextBtn"
                style={{backgroundColor:"#000"}}
              >
                <FaChevronRight />
              </Button>
            </div>
          </>
        )}
      </Container>
    </PullToRefresh>
  );
};

export default User;
