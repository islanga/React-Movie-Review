import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    })
  }, []);

  const submitReview = () => {
    Axios({
      method: 'post',
      url: 'http://localhost:3001/api/insert',
      data: {
        movieName: movieName, 
        movieReview: review
      }
    });
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review }
    ]);
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  }

  return (
    <div className="App bg">
      <h1>Movie List</h1>

      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" placeholder="Enter Movie Name" onChange = {(e) => { setMovieName(e.target.value); }} />

        <label>Movie Review</label>
        <input type="text" name="review" placeholder="Enter Movie Review" onChange = {(e) => { setReview(e.target.value); }} />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return <h2 className="movieList">Movie Name: { val.movieName } | Movie Review: { val.movieReview }
          <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
          </h2>
        })}
      </div>
    </div>
  );
}

export default App;
