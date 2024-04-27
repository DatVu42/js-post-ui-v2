import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import {setTextContent, truncateText} from './common'

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
  setTextContent(
    liElement,
    '[data-id="description"]',
    truncateText(post.description, 100),
  )
  setTextContent(liElement, '[data-id="author"]', post.author)
  setTextContent(
    liElement,
    '[data-id="timeSpan"]',
    ` - ${dayjs(post.updatedAt).fromNow()}`,
  )

  const divElement = liElement.firstElementChild
  if (divElement) {
    divElement.addEventListener('click', (event) => {
      const editPage = liElement.querySelector('[data-id="edit"]')
      if (editPage && editPage.contains(event.target)) return

      window.location.assign(`/post-detail.html?id=${post.id}`)
    })
  }

  const editPage = liElement.querySelector('[data-id="edit"]')
  if (editPage)
    editPage.addEventListener('click', () => {
      window.location.assign(`/add-edit-post.html?id=${post.id}`)
    })

  return liElement
}

export function renderPostList(elementId, postList) {
  if (!postList) return

  const ulElement = document.getElementById(elementId)
  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}
