import {setBackgroundImage, setFieldError, setFieldValue} from './common'
import * as yup from 'yup'

function setFormValues(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title)
  setFieldValue(form, '[name="author"]', formValues?.author)
  setFieldValue(form, '[name="description"]', formValues?.description)

  setFieldValue(form, '[name="imageUrl"]', formValues?.imageUrl)
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}

function getFormValues(form) {
  const formValues = {}
  const data = new FormData(form)
  for (const [key, value] of data) {
    formValues[key] = value
  }

  return formValues
}

function getPostSchema() {
  return yup.object().shape({
    title: yup
      .string()
      .required('Please enter title')
      .min(5, 'Please enter at least 5 characters'),
    author: yup
      .string()
      .required('Please enter author')
      .test(
        'at-least-two-words',
        'Please enter at least two words',
        (value) =>
          value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2,
      ),
    description: yup.string(),
  })
}

async function validatePostForm(form, formValues) {
  try {
    // reset previous errors
    ;['title', 'author'].forEach((name) => setFieldError(form, name, ''))

    const postSchema = getPostSchema()
    await postSchema.validate(formValues, {abortEarly: false})
  } catch (error) {
    if (error.name === 'ValidationError' && Array.isArray(error.inner)) {
      const errorLog = {}

      for (const validationError of error.inner) {
        const name = validationError.path

        if (errorLog[name]) continue

        setFieldError(form, name, validationError.message)
        errorLog[name] = true
      }
    }
  }

  const isValid = form.checkValidity()
  if (!isValid) form.classList.add('was-validated')

  return isValid
}

export function initPostForm({formId, defaultValues, onSubmit}) {
  const form = document.getElementById(formId)
  if (!form) return

  setFormValues(form, defaultValues)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formValues = getFormValues(form)

    const isValid = await validatePostForm(form, formValues)
    if (!isValid) return

    console.log(formValues)
  })
}
