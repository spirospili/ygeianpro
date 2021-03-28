import React from 'react'
import notFound from '../../../public/images/notfound.png'
import InnerPageHeader from './InnerPageHeader';
import { NavLink } from 'react-router-dom';
function NotFound() {
  return (
    <>
     <InnerPageHeader />
    <section className="content-section about-page-content">
    <div className="error_page">
    <img src={notFound} className="img-fluid notFouond"  alt="Image"/>
    <div className="detail">
      <span className="errortext1">Oops! An error ocurred.</span>
      <span className="errortext2">Don’t worry you can found us</span>
      <NavLink to="/" className="backto home">Back To Home Page</NavLink>
    </div>
    </div>
    </section>
    </>
  )
}

export default NotFound
