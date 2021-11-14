import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GetArticleQuery } from '../generated/graphql'

export interface ArticleDetaisProps {
  article: GetArticleQuery['article']
  onToggleLiked: (id: number, current: boolean) => void
  onDelete: (id: number) => void
}

const ArticleTitle = styled.h1`
  margin: 0 0 20px;
  font-size: 22px;
  a {
    text-decoration: none;
    color: #333;
  }
`
const ArticlePanel = styled.div`
  display: flex;
  margin-bottom: 40px;
`
const ArticlePanelItem = styled.div`
  margin-right: 30px;
  font-size: 14px;
  color: #999;
  a {
    text-decoration: none;
    color: #999;
  }
`
const ArticleBody = styled.p`
  line-height: 1.6;
  font-size: 18px;
  color: #333;
`
const Clickable = styled.div`
  cursor: pointer;
`

const ArticleList: React.FC<ArticleDetaisProps> = ({
  article,
  onToggleLiked,
  onDelete,
}: ArticleDetaisProps) => (
  <>
    <ArticleTitle>{article.title}</ArticleTitle>
    <ArticlePanel>
      <ArticlePanelItem>
        <Clickable onClick={() => onToggleLiked(article.id, !article.liked)}>
          {article.liked ? (
            <FontAwesomeIcon icon={['fas', 'heart']} color="#FF6666" />
          ) : (
            <FontAwesomeIcon icon={['far', 'heart']} color="#999" />
          )}
        </Clickable>
      </ArticlePanelItem>
      <ArticlePanelItem>Author: {article.author.name}</ArticlePanelItem>
      <ArticlePanelItem>
        Posted on: {dayjs(article.createdAt).format('MMMM D')}
      </ArticlePanelItem>
      <ArticlePanelItem>
        <Link to={`/articles/edit/${article.id}`}>
          <FontAwesomeIcon
            icon={['fas', 'edit']}
            style={{ marginRight: '5px' }}
          />
          Edit
        </Link>
      </ArticlePanelItem>
      <ArticlePanelItem>
        <Clickable onClick={() => onDelete(article.id)}>
          <FontAwesomeIcon
            icon={['fas', 'trash-alt']}
            style={{ marginRight: '5px' }}
          />
          Delete
        </Clickable>
      </ArticlePanelItem>
    </ArticlePanel>
    <ArticleBody>{article.body}</ArticleBody>
  </>
)
export default ArticleList
