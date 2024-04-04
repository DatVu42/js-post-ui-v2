import postApi from './api/postApi'
import {getUlPagination, setTextContent, truncateText} from './utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import debounce from 'lodash.debounce'

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
  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}

async function handleFilterChange(filterName, filterValue) {
  try {
    // update params
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)
    // reset page if needed
    if (filterName === 'title_like') url.searchParams.set('_page', 1)
    history.pushState({}, '', url)

    // fet data & re-render post list
    const {data, pagination} = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('Fail to fetch post list!', error)
  }
}

function handlePrevClick() {
  const ulPagination = getUlPagination()
  if (!ulPagination) return

  const page = Number.parseInt(ulPagination.dataset.page) || 1
  if (page <= 1) return

  handleFilterChange('_page', page - 1)
}

function handleNextClick() {
  const ulPagination = getUlPagination()
  if (!ulPagination) return

  const page = Number.parseInt(ulPagination.dataset.page) || 1
  const totalPages = Number.parseInt(ulPagination.dataset.totalPages)
  if (page >= totalPages) return

  handleFilterChange('_page', page + 1)
}

function initPagination() {
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

function renderPagination(pagination) {
  const ulPagination = getUlPagination()
  if (!pagination || !ulPagination) return

  // calc totalPages
  const {_page, _limit, _totalRows} = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // update page & totalPages on ulPagination
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  // check disable/enable next & prev
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')

  if (_page >= totalPages)
    ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

function initSearch(queryParams) {
  const searchInput = document.getElementById('searchInput')
  if (!searchInput) return

  if (queryParams.get('title_like'))
    searchInput.value = queryParams.get('title_like')

  const debounceSearch = debounce((e) => {
    handleFilterChange('title_like', e.target.value)
  }, 500)

  searchInput.addEventListener('input', debounceSearch)
}

;(async () => {
  try {
    const url = new URL(window.location)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

    history.pushState({}, '', url)
    const queryParams = url.searchParams

    initPagination()
    initSearch(queryParams)

    const {data, pagination} = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('Get all failed', error)
  }
})()
