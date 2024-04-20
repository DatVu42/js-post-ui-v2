import dayjs from 'dayjs'
import postApi from './api/postApi'
import { registerLightbox, setTextContent } from './utils'

function renderPostDetail(post) {
  if (!post) return

  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    ` - ${dayjs(post.updatedAt).format('DD MM YYYY HH:MM')}`,
  )
  setTextContent(document, '#postDetailDescription', post.description)

  const heroImageElement = document.getElementById('postHeroImage')
  if (heroImageElement) {
    heroImageElement.style.backgroundImage = `url('${post.imageUrl}')`

    heroImageElement.addEventListener('error', () => {
      heroImageElement.style.backgroundImage =
        'url("https://picsum.photos/id/37/1368/400")'
    })
  }
}

;(async () => {
  registerLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]'
  })

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
