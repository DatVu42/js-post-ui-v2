export function setTextContent(parentElement, selector, text) {
  if (!parentElement) return

  const element = parentElement.querySelector(selector)
  if (element) element.textContent = text
}

export function truncateText(text, maxLength) {
  if (text.length < maxLength) return text

  return `${text.slice(0, maxLength - 1)}…`
}

export function setBackgroundImage(parent, selector, imageUrl) {
  if (!parent) return

  const element = parent.querySelector(selector)
  if (element) {
    element.style.backgroundImage = `url("${imageUrl}")`

    element.addEventListener('error', () => {
      element.style.backgroundImage =
        'url("https://picsum.photos/id/37/1368/400")'
    })
  }
}

export function setFieldValue(form, selector, value) {
  const field = form.querySelector(selector)
  if (field) field.value = value
}

export function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`)
  if (element) {
    element.setCustomValidity(error)

    setTextContent(element.parentElement, ".invalid-feedback", error)
  }
}