import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';

const TableNews = ({ articles }) => {

  const Articles = articles.map((article, index) => {
    return <tr>
      <td>
        {article.source.name}
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
        <Button variant="outline-success" id={index} onClick={() => {

          $(`#${index}`).prop('disabled', true).removeClass("variant")

          $.ajax({
            url: "/saveArticle",
            type: "POST",
            processData: false,
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(article),
          }).done((data) => { console.log('Succes', data) })
            .fail((error) => { console.log('error', error) })
          //  OnClick inner function parens
        }
          // VV onClick parens
        }
        >
          Save For Later</Button>
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