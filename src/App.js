import React from 'react';
import UserList from './Users';
import Posts from './Posts';
import UserPosts from './UserPosts.jsx';
import UserReport from './UserReport.jsx';
import SendFileReport from './SendFileReport';
import './App.css';

function App() {
  return (
    <div>
      <UserList />
      <UserPosts />
      <UserReport />
      <SendFileReport />
    </div>
  );
}

export default App;
