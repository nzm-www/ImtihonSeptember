import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://fn27.vimlc.uz/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id, token]);

  if (!book) return <p className="loding">Loading...</p>;

  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="wrap">
          <div className="bookdetails">
            <h1>{book.title}</h1>
            <div className="info">
              <img className="imgde" src={book.thumbnailUrl} alt={book.title} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <div className="divbox">
                  <p>
                    <strong>Authors:</strong> {book.authors.join(", ")}
                  </p>
                  <p>
                    <strong>Categories:</strong> {book.categories.join(", ")}
                  </p>
                  <p>
                    <strong>Published Date:</strong>{" "}
                    {new Date(book.publishedDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Page Count:</strong> {book.pageCount}
                  </p>
                  <p>
                    <strong>Language:</strong> {book.language}
                  </p>
                  <p>
                    <strong>ISBN:</strong> {book.isbn}
                  </p>
                </div>
                <p className="descrp">
                  <strong>Description:</strong>{" "}
                  {book.longDescription || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link to="/">
          <p className="back">Orqaga</p>
        </Link>
      </div>
    </div>
  );
};

export default Details;
