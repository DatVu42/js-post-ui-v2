import axiosClient from './axiosClient'

const postApi = {
  getAll(params) {
    const url = '/posts'
    return axiosClient.get(url, {params})
  },

  getById(id) {
    const url = `/posts/${id}`
    return axiosClient.get(url)
  },

  add(data) {
    const url = '/posts'
    return axiosClient.post(url, data)
  },

  remove(id) {
    const url = `/posts/${id}`
    return axiosClient.delete(url)
  },

  update(data) {
    const url = `/posts/${data.id}`
    return axiosClient.put(url, data)
  }
}

export default postApi
