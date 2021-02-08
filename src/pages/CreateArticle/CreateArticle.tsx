import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { ArticleForm } from '../../components/ArticleForm'
import { useFetch } from '../../hooks/useFetch'
import { Article, ArticleFormType } from '../../types'


export function CreateArticle() {
  const apiUrl = '/articles'
  const { data, error, doFetch } = useFetch<{article: Article}>(apiUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessfullSubmit, setStateIsSuccessfullSubmit] = useState(false)

  const initialValues: ArticleFormType = {
    title: '',
    body: '',
    description: '',
    tagList: []
  }

  const onSubmit = (article: ArticleFormType) => {
    setIsSubmitting(true)

    doFetch({
      method: 'POST',
      data: {
        article
      }
    })
  }


  useEffect(() => {
    if (!data) {
      return
    }

    setIsSubmitting(false)
    setStateIsSuccessfullSubmit(true)
  }, [data])

  useEffect(() => {
    if (!error) {
      return
    }
    setIsSubmitting(false)
  }, [error])


  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${data?.article.slug}`} />
  }

  return (
    <div className="create-article-page">
      <ArticleForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        error={error}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
