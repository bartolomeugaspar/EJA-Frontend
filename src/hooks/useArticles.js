import { useState, useEffect } from 'react'
import api from '../services/api'

export const useArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await api.get('/blog/articles')
      // A API retorna { data: { articles: [], pagination: {} } }
      const articlesData = response.data.data?.articles || response.data.data || []
      setArticles(articlesData)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar artigos')
      console.error('Erro ao buscar artigos:', err)
    } finally {
      setLoading(false)
    }
  }

  const createArticle = async (articleData) => {
    try {
      const response = await api.post('/blog/articles', articleData)
      setArticles([...articles, response.data.data])
      return response.data
    } catch (err) {
      throw err
    }
  }

  const updateArticle = async (id, articleData) => {
    try {
      const response = await api.put(`/blog/articles/${id}`, articleData)
      setArticles(articles.map(a => a.id === id ? response.data.data : a))
      return response.data
    } catch (err) {
      throw err
    }
  }

  const deleteArticle = async (id) => {
    try {
      await api.delete(`/blog/articles/${id}`)
      setArticles(articles.filter(a => a.id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    articles,
    loading,
    error,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle
  }
}

export const useSavedArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSavedArticles()
  }, [])

  const fetchSavedArticles = async () => {
    try {
      setLoading(true)
      const response = await api.get('/blog/saved')
      setArticles(response.data.data || [])
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar artigos salvos')
      console.error('Erro ao buscar artigos salvos:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveArticle = async (articleId) => {
    try {
      await api.post(`/blog/articles/${articleId}/save`)
      await fetchSavedArticles()
    } catch (err) {
      throw err
    }
  }

  const unsaveArticle = async (articleId) => {
    try {
      await api.delete(`/blog/articles/${articleId}/save`)
      setArticles(articles.filter(a => a.id !== articleId))
    } catch (err) {
      throw err
    }
  }

  return {
    articles,
    loading,
    error,
    fetchSavedArticles,
    saveArticle,
    unsaveArticle
  }
}
