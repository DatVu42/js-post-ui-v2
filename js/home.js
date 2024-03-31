import postApi from './api/postApi'
import {getUlPagination, setTextContent, truncateText} from './utils'
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

function handlePrevClick() {
  console.log('Prev click')
}

function handleNextClick() {
  console.log('Next click')
}

function handlePagination() {
  const ulPagination = getUlPagination()
  if (!ulPagination) return

  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink)
    prevLink.addEventListener('click', (e) => {
      e.preventDefault()
      handlePrevClick()
    })

  const nextLink = ulPagination.lastElementChild?.firstElementChild
  if (nextLink)
    nextLink.addEventListener('click', (e) => {
      e.preventDefault()
      handleNextClick()
    })
}

function initUrl() {
  const url = new URL(window.location)
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  history.pushState({}, '', url)
}

;(async () => {
  try {
    initUrl()

    const queryParams = new URLSearchParams(window.location.search)
    const {data, pagination} = await postApi.getAll(queryParams)
    renderPostList(data)
    handlePagination()
  } catch (error) {
    console.log('Network something wrong!', error)
  }
})()
