import postApi from './api/postApi'
import {initPostForm} from './utils'
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
      onSubmit: formValues => console.log('submit', formValues)
    })
  } catch (error) {
    console.log('Failed to fet add edit post', error)
  }
})()
