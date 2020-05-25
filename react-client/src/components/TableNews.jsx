import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TableNews = ({ articles }) => {

  const Articles = articles.map((article) => {
    return <tr>
      <td>
        {article.source.name}
      </td>
      <td>
        <img src={article.urlToImage} width="250px" />
      </td>
      <td>
        <p>
          {article.description}
        </p>
        <p>
          Author: {article.author}
        </p>
        <Button variant="outline-success">Save For Later</Button>
      </td>
      <td>{article.publishedAt}</td>
    </tr>
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