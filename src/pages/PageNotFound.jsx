import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <>
            <Layout  title={"go back- page not found"}>
                <div className="d-flex flex-column justify-content-center align-items-center " style={{minHeight:"65vh"}}>
                    <h1 className='my-2'>404</h1>
                    <h2 className='my-2'>Page Not Found</h2>
                    <Link to='/'><button type="button" class="btn btn-dark my-2">Go Back</button></Link>
                </div>
            </Layout>
        </>
    )
}

export default PageNotFound
