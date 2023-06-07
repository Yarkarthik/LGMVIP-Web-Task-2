import React, { useState } from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #f2f2f2;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
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

const UserCardGrid = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar>
        <h1>USER CARD</h1>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default UserCardGrid;
