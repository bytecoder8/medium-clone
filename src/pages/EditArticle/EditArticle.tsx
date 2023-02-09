import React, { useEffect, useMemo, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { ArticleForm } from '../../components/ArticleForm'
import { Loader } from '../../components/Loader/Loader'
import { ServerErrors } from '../../components/ServerErrors'
import { useFetch } from '../../hooks/useFetch'
import { Article, ArticleFormType } from '../../types'


interface ParamsType {
  slug: string
}

export function EditArticle({ match }: RouteComponentProps<ParamsType>) {
  const apiUrl = `/articles/${match.params.slug}`

  const {
    data: fetchedArticleData,
    error: errorLoadingArticle,
    doFetch: doFetchArticle,
    isLoading: isLoadingArticle
  } = useFetch<{article: Article}>(apiUrl)

  const { data, error, doFetch: doUpdateArticle } = useFetch<{article: Article}>(apiUrl)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessfullSubmit, setStateIsSuccessfullSubmit] = useState(false)
  const [initialValues, setInitialValues] = useState<ArticleFormType>({
    title: '',
    body: '',
    description: '',
    tagList: []
  })


  const onSubmit = (article: ArticleFormType) => {
    setIsSubmitting(true)

    doUpdateArticle({
      method: 'PUT',
      data: {
        article
      }
    })
  }

  // Fetch and load article
  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useMemo(() => {
    if (!fetchedArticleData) {
      return
    }

    const article = fetchedArticleData.article
    setInitialValues({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList
    })
  }, [fetchedArticleData])


  // Update Article
  useMemo(() => {
    if (!data) {
      return
    }

    setIsSubmitting(false)
    setStateIsSuccessfullSubmit(true)
  }, [data])

  useMemo(() => {
    if (!error) {
      return
    }
    setIsSubmitting(false)
  }, [error])


  // display view
  if (isLoadingArticle) {
    return <Loader />
  }

  if (errorLoadingArticle) {
    return <ServerErrors error={errorLoadingArticle} />
  }

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
        title="Edit Article"
      />
    </div>
  )
}
