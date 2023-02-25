import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
const { articles, getArticles, setCurrentArticleId, deleteArticle, updateArticle, currentArticle, currentArticleId } = props;

  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
const navigate = useNavigate();  

const redirectToLogin = () => { 
return navigate('/')} 

const editArticle = (article_id) => {
  setCurrentArticleId(article_id);
};

  
  useEffect(() => {
    // ✨ grab the articles here, on first render only
    if (!localStorage.getItem('token')) {
      navigate(redirectToLogin)
     } else {
      getArticles();
     }
  }, [currentArticle])
 

  

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        articles.length === 0
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button  disabled={currentArticleId ? true : false} onClick={() => editArticle(art.article.id)}>Edit</button>
                  <button  disabled={currentArticleId ? true : false} onClick={() => deleteArticle(art.article.id)}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
