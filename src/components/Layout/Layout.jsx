import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet';
import {Toaster} from 'react-hot-toast'

const Layout = ({children,description,title,keyword,author}) => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keyword' content={keyword} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
        <Header/>
            <main style={{minHeight : "100vh"}}>
              <Toaster/>
                {children}
            </main>
        <Footer/>
    </>
  )
}

Layout.defaultProps = {
  title : "Ecommerce app - shop now",
  description : "Mern stack project",
  keyword : "mern,react,node,mongodb",
  author: "Tejas Saykar"
}

export default Layout
