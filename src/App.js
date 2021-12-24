import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Email from "./components/Email/Email";
import EmailList from "./components/EmailList/EmailList";
import { updateMailData } from "./features/mailDataSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://run.mocky.io/v3/58770279-0738-4578-a1cf-c56a193fce98"
      );
      const data = response.data;
      dispatch(
        updateMailData({
          mails: [...data],
        })
      );
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/mail" element={<Email />} />
            <Route path="/" element={<EmailList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
