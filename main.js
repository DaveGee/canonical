
const monthsStr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December'
]

const formatDate = dateISO => {

  const date = new Date(dateISO)

  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()

  return `${day} ${monthsStr[month]} ${year}`
}

const extractFeatures = post => {

  const topics = post._embedded['wp:term'].flat().filter(term => term.taxonomy === 'topic')
  const categories = post._embedded['wp:term'].flat().filter(term => term.taxonomy === 'category')

  let topic = {
    name: 'Undefined topic',
    link: '#'
  }
  if (topics && topics.length > 0) {
    topic = topics[0]
  }

  return {
    featuredUrl: post.featured_media,
    title: post.title.rendered,
    link: post.link,
    topicName: topic.name,
    topicUrl: topic.link,
    author: post._embedded.author[0].name,
    authorUrl: post._embedded.author[0].link,
    date: post.date,
    categories: categories.map(category => ({
      name: category.name,
      link: category.link
    }))
  }
}

const buildPost = post => {

  const features = extractFeatures(post)

  const categories = features.categories.map(category => `
    <a href="${category.link}" class="p-link--soft">${category.name}</a>
  `).join(',')
    
  return `
    <div class="p-card col-4 u-no-padding card-bordered">
      <div class="p-card__inner">
        <p class="p-text--small-caps u-text--muted u-sv1">${features.topicName}</p>
        <hr class="is-muted">
        
        
        <img src="${features.featuredUrl}" alt="${features.title}">
        <h4><a href="${features.link}">${features.title}</a></h4>
        <p>By <a href="${features.authorUrl}">${features.author}</a> on ${formatDate(features.date)}</p>
        
        <hr class="is-muted">
        ${categories}
      </div>
    </div>
  `
}

document.addEventListener('DOMContentLoaded', function () {

  const url = 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json'

  const blogPostsContainer = document.getElementById('blog-posts')

  fetch(url)
    .then(response => response.json())
    .then(data => {

      // take only 3 first posts, whatever the number of posts returned
      const posts = data.slice(0, 3)

      const postHtml = posts.map(buildPost)

      blogPostsContainer.innerHTML = postHtml.join('')
    })
    .catch(error => {
      console.error('Error:', error)
      blogPostsContainer.innerHTML = '<p>Error loading blog posts</p>'
    })
})
