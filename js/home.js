import postApi from './api/postApi'
import { setTextContent } from './utils'

function createPostElement(post) {
  if (!post) return

  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return

  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) thumbnailElement.src = post.imageUrl

  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', post.description)
  setTextContent(liElement, '[data-id="author"]', post.author)
  setTextContent(liElement, '[data-id="timeSpan"]', post.updatedAt)

  return liElement
}

function renderPostList(postList) {
  if (!postList) return

  const ulElement = document.getElementById('postList')

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}

;(async () => {
  const queryParams = {
    _page: 1,
    _limit: 6,
  }
  const {data, pagination} = await postApi.getAll(queryParams)
  renderPostList(data)
})()
