import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import axios from 'axios';
const TableNews = ({ articles, saveOrDelete, refresh }) => {

  const Articles = articles.map((article, index) => {
    return <tr>
      <td>
        {article.source.name}
        <Button onClick={

          () => {
            console.log(article.description)
            axios.post('/tone', { url: article.url, description: article.description })
              .then((response) => console.log(response))
          }
        }

        >Get tone</Button>
      </td>
      <td>
        <a href={article.url} target={article.url} target="_blank">
          <img src={article.urlToImage} width="250px" />
        </a>
      </td>
      <td>
        <p>
          {article.title}
        </p>
        <p>
          {article.description}
        </p>
        <p>
          Author: {article.author}
        </p>
        <Button variant="outline-success" id={index} onClick={(event) => {

          if (saveOrDelete === 'Delete') {

            console.log('Delete functionality here!', article.url)
            axios.delete('/deleteArticle', { data: { url: article.url } })
              .then((response) => {
                refresh()
              })
              .catch((err) => console.log(err))

          } else {

            axios.post("/saveArticle", { article, })
              .then((response) => { console.log(response) })
              .catch((err) => { console.log('Error', err) })

          }

        }
          // VV onClick parens
        }
        >
          {saveOrDelete}</Button>
      </td>
      <td>{article.publishedAt}</td>
    </tr >
  })


  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Author/News Source</th>
          <th>Image</th>
          <th>Description</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {Articles}
      </tbody>
    </Table>
  )
}

export default TableNews;