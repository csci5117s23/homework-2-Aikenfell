import React, { useState, useEffect } from 'react';
import { getListEntries } from '@/callFuncts/dbFuncts';
import { addListEntry } from '@/callFuncts/dbFuncts';
import { useAuth } from "@clerk/nextjs";
// const { isLoaded, userId, sessionId, getToken } = useAuth();

// React backend API endpoint and API token
// const API_ENDPOINT = 'localhost:3000/hello';
const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
// const API_KEY = '189934cd-aba8-467e-b771-402262ee3cd2';

function App() {
  // Application state variables
  const [visits, setVisits] = useState(null);
  const [message, setMessage] = useState(null);
  const [entries, setEntries] = useState(null);


  useEffect(() => {
    async function populateList() {
      // if (userId) {
      // const token = await getToken({ template: "codehooks" });
      const entries = await getListEntries();
      console.log(entries);
      setEntries(entries);
      // }
    }
    populateList();
    addListEntry("title","desc","category");


  }, [])

  return (
    <div className="App">
        <header className="App-header">
          <img src={''} className="App-logo" alt="logo" />
          <h2>
            React backend with Codehooks.io
          </h2>
          <h2 style={{height: '50px'}} className="heading">
            {message || ''}
          </h2> 
          <p>
            Visitors: {visits || '---'}
          </p>          
        </header>
      </div>
  );
}

export default App;