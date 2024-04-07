export function initPagination({elementId, defaultParams, onChange}) {
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  // TODO: get active page

  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink)
    prevLink.addEventListener('click', (e) => {
      e.preventDefault()
      const page = Number.parseInt(ulPagination.dataset.page) || 1
      if (page <= 1) return

      onChange(page - 1)
    })

  const nextLink = ulPagination.lastElementChild?.firstElementChild
  if (nextLink)
    nextLink.addEventListener('click', (e) => {
      e.preventDefault()
      const page = Number.parseInt(ulPagination.dataset.page) || 1
      const totalPages = Number.parseInt(ulPagination.dataset.totalPages)
      if (page >= totalPages) return

      onChange(page + 1)
    })
}

export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId)
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
