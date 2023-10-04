import React from 'react';
import logo from './logo.svg';
import UserTable from './components/UserTable';
import UserForm from './components/NewUser';
function App() {
  return (
    <div className="App">
      <UserForm />
      <UserTable />
    </div>
  );
}

export default App;
