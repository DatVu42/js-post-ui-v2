import postApi from './api/postApi'
import { setTextContent, truncateText } from './utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

function createPostElement(post) {
  if (!post) return

  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return

  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl

    thumbnailElement.addEventListener('error', () => {
        thumbnailElement.src = 'https://placehold.co/1368x400?text=Thumbnail'
    })
  }

  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`)

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
