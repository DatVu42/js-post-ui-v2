import postApi from './api/postApi'
import {setFormValues} from './utils'
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

    setFormValues(defaultValues)
  } catch (error) {
    console.log('Failed to fet add edit post', error)
  }
})()
