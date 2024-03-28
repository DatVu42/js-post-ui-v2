export function setTextContent(parentElement, selector, text) {
  if (!parentElement) return

  const element = parentElement.querySelector(selector)

  return (element.textContent = text)
}

export function truncateText(text, maxLength) {
  if (text.length < maxLength) return text

  return `${text.slice(0, maxLength - 1)}…`
}
