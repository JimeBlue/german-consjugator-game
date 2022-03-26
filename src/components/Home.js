import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [verbs, setVerbs] = useState(null);
  useEffect(() => {
    axiosGet();
  }, []); //  Run once on load

  const axiosGet = () => {
    axios
      .get(`https://my-german-verb-conjugation-api.herokuapp.com/verbs`)
      .then((data) => setVerbs(data.data));
  };

  console.log(verbs);

  if (!verbs) return null; // empty render until we get data
  return (
    <section>
      <h1>Conjugate the following verb:</h1>
      <ul>
        <li>Verb: </li>
        <li>Person: </li>
        <li>Tense: </li>
      </ul>
    </section>
  );
};

export default Home;
