import {initPagination, initSearch, renderPagination, renderPostList} from './utils'
import postApi from './api/postApi'

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
    renderPostList('postList', data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('Fail to fetch post list!', error)
  }
}

;(async () => {
  try {
    const url = new URL(window.location)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

    history.pushState({}, '', url)
    const queryParams = url.searchParams

    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page) 
    })

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value)
    })

    const {data, pagination} = await postApi.getAll(queryParams)
    renderPostList('postList', data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('Get all failed', error)
  }
})()
