function showLightbox(modalElement) {
  const modal = new window.bootstrap.Modal(modalElement)
  modal.show()
}

export function registerLightbox({
  modalId,
  imgSelector,
  prevSelector,
  nextSelector,
}) {
  const modalElement = document.getElementById(modalId)
  if (!modalElement) return

  if (modalElement.dataset.registered) return

  const imgElement = modalElement.querySelector(imgSelector)
  const prevElement = modalElement.querySelector(prevSelector)
  const nextElement = modalElement.querySelector(nextSelector)

  let imgList = []
  let currentIndex = 0

  function showImgAtIndex(index) {
    imgElement.src = imgList[index].src
  }

  document.addEventListener('click', (event) => {
    const {target} = event
    if (target.tagName !== 'IMG' || target.dataset.album !== 'lightbox-album')
      return

    imgList = document.querySelectorAll(
      `img[data-album="${target.dataset.album}"]`,
    )
    currentIndex = [...imgList].findIndex((x) => x === target)

    showImgAtIndex(currentIndex)
    showLightbox(modalElement)
  })

  prevElement.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImgAtIndex(currentIndex)
  })

  nextElement.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgList.length
    showImgAtIndex(currentIndex)
  })

  modalElement.dataset.registered = true
}
