import logo from './logo.svg';
import './App.css';
import { Routes, Route, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageLayout } from './components/PageLayout'
import Home from './components/Home';
import Settings from './components/Settings';




function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      <PageLayout >
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/settings" exact element={<Settings />} />
            </Routes>
          </PageLayout>
    </>
  );
}

export default App;
