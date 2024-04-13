import postApi from './api/postApi'
import { setTextContent } from './utils'
import dayjs from 'dayjs'

function renderPostDetail(post) {
    if (!post) return

    setTextContent(document, '#postDetailTitle', post.title)
    setTextContent(document, '#postDetailAuthor', post.author)
    setTextContent(document, '#postDetailTimeSpan', ` - ${dayjs(post.updatedAt).format('DD MM YYYY HH:MM')}`)
    setTextContent(document, '#postDetailDescription', post.description)

    const heroImageElement = document.getElementById('postHeroImage')
    if (heroImageElement) {
        heroImageElement.style.backgroundImage = `url('${post.imageUrl}')`

        heroImageElement.addEventListener('error', () => {
            heroImageElement.style.backgroundImage = 'url("https://picsum.photos/id/37/1368/400")'
        })
    }

    const editPage = document.getElementById('goToEditPageLink')
    if (editPage) {
        editPage.textContent = 'Edit page'
        editPage.addEventListener('click', () => {
            window.location.assign(`/add-edit-post.html?id=${post.id}`)
        })
    }
}

;(async () => {
  try {
    // get query params => post id
    const queryParams = new URLSearchParams(window.location.search)
    const postId = queryParams.get('id')
    if (!postId) return

    // fet post with id
    const post = await postApi.getById(postId)
    renderPostDetail(post)
  } catch (error) {
    console.log('Fail to fet post detail', error)
  }
})()
