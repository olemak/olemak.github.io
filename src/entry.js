import getPosts from './js/getPosts.js'
import Posts from './components/Posts.jsx'
import ReactDOM from 'react-dom'

getPosts();


(() => { function ready() {
    let root = document.querySelector('[data-root]')
    ReactDOM.render( <Posts/>, root )
};  
  if (document.readyState != 'loading') {ready()}
  else {document.addEventListener('DOMContentLoaded', ready )}
})();