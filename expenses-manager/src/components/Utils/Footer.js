/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer orange">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About me</h5>
            <p className="grey-text text-lighten-4">
              I'm a student at FMI, Sofia, Bulgaria, developing a single page web application for the 
              fullstack course with react.js + node.js + redux.js. 
            </p>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">Contacts</h5>
            <ul>
              <li>
                <a className="white-text" target="_blank" href="https://www.facebook.com/araba.ivan">
                  Facebook
                </a>
              </li>
              <li>
                <a className="white-text">
                  Twitter
                </a>
              </li>
              <li>
                <a className="white-text" target="_blank" href="https://www.linkedin.com/in/%D0%B8%D0%B2%D0%B0%D0%BD-%D0%B0%D1%80%D0%B0%D0%B1%D0%B0%D0%B4%D0%B6%D0%B8%D0%B9%D1%81%D0%BA%D0%B8-5995931b1/">
                  Linkedin
                </a>
              </li>
              <li>
                <a className="white-text" target="_blank" href="https://www.instagram.com/ivanarabadzhiyski/">
                  Instagram
                </a>
              </li>
              <li>
                <a className="white-text" target="_blank" href="https://github.com/18ivan18">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          Made by{' '}
          <a
            className="orange-text text-lighten-3"
            href="https://github.com/18ivan18"
          >
            Ivan Arabadzhiyski
          </a>
        </div>
      </div>
    </footer>
    )
}

export default Footer