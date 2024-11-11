import React from 'react'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'
import { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
      <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main style={{ minHeight: "78.9vh"}}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
