//@ts-ignore
import { EntityError } from '../Error/EntityError'
import { UnauthorizedError } from '../Error/UnauthorizedError'
//@ts-ignore
import { NetworkError } from '../Error/NetworkError'
//@ts-ignore
import { ApiError } from '../Error/ApiError'
//@ts-ignore
import { NotFoundError } from '../Error/NotFoundError'

import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { DataObject } from '../DataObject'

export interface ApiConfig extends AxiosRequestConfig{
  noWrapper?: boolean
}

export default class ApiProxy {
  api: AxiosInstance

  constructor (axios: AxiosInstance) {
    this.api = axios
  }

  get (url: string, data: DataObject = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.api.get(url, {
      ...config,
      params: data
    }), config.noWrapper)
  }

  put (url: string, data: DataObject = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.api.put(url, data, config), config.noWrapper)
  }

  post (url: string, data: DataObject = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.api.post(url, data, config), config.noWrapper)
  }

  delete (url: string, data: DataObject = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.api.delete(url, data), config.noWrapper)
  }

  setToken (token: string) {
    // NOTE: api is the singleton so we are using it like storage.
    // This is the hack, but we have no idea how to make other way. We don`t want to send token manually each time.
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  isNetworkErrorException (error: AxiosError) {
    return error.message === 'Network Error'
  }

  isApiException (error: AxiosError) {
    return !!error.response
  }

  async handleExceptions (cb: Function, noWrapper: boolean = false) {
    let response = null
    try {
      response = await cb()
    }
    catch (exception) {
      const exceptionResponse = exception && exception.response
      const data = exceptionResponse && exceptionResponse.data
      const status = exceptionResponse && exceptionResponse.status

      if (EntityError.isEntityError(exception)) {
        throw EntityError.createFromAxiosError(exception)
      }
      if (status === 401) {
        throw new UnauthorizedError({
          error: data.error,
          message: data.message,
          previous: exception,
          data: data.data
        })
      }
      if (status === 404) {
        throw new NotFoundError({
          previous: exception,
          data: data.data
        })
      }
      if (this.isNetworkErrorException(exception)) {
        throw new NetworkError({
          message: exception.message
        })
      }
      if (this.isApiException(exception)) {
        throw new ApiError({
          message: data.message
        })
      }
      throw exception
    }
    const responseData = response.data
    if (noWrapper) {
      return responseData
    }
    return responseData && responseData.data
  }
}
