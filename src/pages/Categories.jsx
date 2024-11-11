import React from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container mb-4 s-margin">
        <div className="row">
          {categories.map((c) => (
            <div className="mt-3 mb-3 gx-3 gy-3" key={c._id}>
            <div className="card mt-5">
              <Link to={`/category/${c.slug}`} className="btn btn-dark p-4 fs-2 p-small">
                {c.name}
              </Link>
            </div>
          </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories