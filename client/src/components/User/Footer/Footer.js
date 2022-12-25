
import React from 'react'
import './Foote.css';

function Footer() {
    return (
        <div className='mainFooter'>

        <div className="footer">
            <div className="social-media-icons">
                <a><i class="fab fa-facebook-square"></i></a>
                <a><i class="fab fa-instagram-square"></i></a>
                <a><i class="fab fa-twitter-square"></i></a>
                <a><i class="fab fa-youtube-square"></i></a>
            </div>
            <div className="list-items">
                <div className="column">
                    <a>Audio and Subtitles</a>
                    <a>Media Centre</a>
                    <a>Privacy</a>
                    <a>Contact Us</a>
                </div>
                <div className="column">
                    <a>Audio Description</a>
                    <a>Investor Relations</a>
                    <a>Legal Notices</a>
                </div>
                <div className="column">
                    <a>Help Centre</a>
                    <a>Jobs</a>
                    <a>Cookie Preferences</a>
                </div>
                <div className="column">
                    <a>Gift Cards</a>
                    <a>Terms of Use</a>
                    <a>Corporate Information</a>
                </div>
            </div>
           
        </div>
        </div>

    )
}

export default Footer