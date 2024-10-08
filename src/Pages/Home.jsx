import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Header from "../components/Header";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://fn27.vimlc.uz/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleCardClick(id) {
    navigate(`/books/${id}`);
  }

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://fn27.vimlc.uz/books/filter?minPages=${min}&maxPages=${max}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookDetails();
  }, [min, max, token]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://fn27.vimlc.uz/books/search?query=${search}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [search, token]);

  return (
    <div className="homebody">
      <Header />
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "20px",

            paddingBottom: "20px",
          }}
        >
          <form className="homeform">
            <div className="wrapper">
              <span className="letter letter1">R</span>
              <span className="letter letter2">e</span>
              <span className="letter letter3">a</span>
              <span className="letter letter4">d</span>
              <span className="letter letter5"></span>
              <span className="letter letter6">B</span>
              <span className="letter letter7">o</span>
              <span className="letter letter8">o</span>
              <span className="letter letter9">k</span>
              <span className="letter letter10"></span>
            </div>

            <label className="homeinputs" htmlFor="">
              <FaSearch />
              <input
                className="intot"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Qidiruv"
              />
            </label>

            <input
              className="homeinputs"
              onChange={(e) => {
                setMin(e.target.value);
              }}
              type="number"
              placeholder="Boshlanish Sahifa"
            />
            <input
              className="homeinputs"
              onChange={(e) => {
                setMax(e.target.value);
              }}
              type="number"
              placeholder="Tugash Sahifa"
            />
          </form>
        </div>
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                className="card"
                key={book.id}
                onClick={() => handleCardClick(book.id)}
              >
                <img src={book.thumbnailUrl} alt={book.title} />
                <h3 className="cardh3x`">{book.title}</h3>
                <p>Authors: {book.authors.join(", ")}</p>
                <p>Categories: {book.categories.join(", ")}</p>
                <p>
                  <strong>Page Count:</strong> {book.pageCount}
                </p>
              </div>
            ))
          ) : (
            <p>
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </p>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
