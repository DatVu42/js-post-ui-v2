import postApi from './api/postApi'
import {initPostForm, toast} from './utils'

async function handlePostFormSubmit(formValues) {
  try {
    // check add/edit mode
    // call API
    const savePost = formValues.id
      ? await postApi.update(formValues)
      : await postApi.add(formValues)

    // show success message
    toast.success('Save post successfully!')

    // redirect to post detail page
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savePost.id}`)
    }, 2000)
  } catch (error) {
    console.log('Fail to save post')
    toast.error(error)
  }
}

;(async () => {
  try {
    const queryParams = new URLSearchParams(window.location.search)
    const postId = queryParams.get('id')

    const defaultValues = postId
      ? await postApi.getById(postId)
      : {
          title: '',
          author: '',
          description: '',
          imageUrl: '',
        }

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: handlePostFormSubmit,
    })
  } catch (error) {
    console.log('Failed to fet add edit post', error)
  }
})()
