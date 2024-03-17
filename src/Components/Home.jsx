import React, { useState } from 'react';
import Popups from './Popups';

const Home = () => {
    const [popupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    };

    return (
        <div className='bg-dark min-vh-100'>
            <nav  style={{ backgroundColor: 'rgb(0, 188, 212)' }}  className="navbar navbar-expand-lg  border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="navbar-brand" href="#">
                        <i className="bi bi-chevron-left"></i> View Audience
                    </div>
                </div>
            </nav>

            <button
                className="btn btn-outline-light font-monospace"
                style={{ backgroundColor: 'transparent', color: 'wheat', marginLeft: '30vh', marginTop: '10vh' }}
                onClick={togglePopup}
            >
              Save Segment
            </button>

            <Popups isOpen={popupOpen} onClose={togglePopup} />
        </div>
    );
}

export default Home;
