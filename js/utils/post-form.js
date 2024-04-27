import { setBackgroundImage, setFieldValue } from "./common"


export function setFormValues(formValues) {
    const postForm = document.getElementById('postForm')
    if (!postForm || !formValues) return

    setFieldValue(postForm, '[name="title"]', formValues.title)
    setFieldValue(postForm, '[name="author"]', formValues.author)
    setFieldValue(postForm, '[name="description"]', formValues.description)

    setFieldValue(postForm, '[name="imageUrl"]', formValues.imageUrl)
    setBackgroundImage(document, '#postHeroImage', formValues.imageUrl)
}