import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #f2f2f2;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const PageNumbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PageNumber = styled.span`
  cursor: pointer;
  margin: 0 0.5rem;
  color: ${(props) => (props.active ? "#007bff" : "inherit")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const UserCardGrid = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getUsers = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <Navbar>
        <h1>Hello ReqRes users!</h1>
      </Navbar>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <img src={user.avatar} alt={user.first_name} />
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
              </ListItem>
            ))}
          </List>

          <PageNumbers>
            <PageNumber
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &lt; Previous
            </PageNumber>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PageNumber
                  key={page}
                  onClick={handlePageClick.bind(null, page)}
                  active={page === currentPage}
                >
                  {page}
                </PageNumber>
              )
            )}
            <PageNumber
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </PageNumber>
          </PageNumbers>
        </>
      )}
    </>
  );
};

export default UserCardGrid;
