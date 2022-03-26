import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  let verb = '';
  let pronoum = '';
  let tense = '';
  let answer = '';

  const [verbs, setVerbs] = useState(null);

  useEffect(() => {
    axiosGet();
  }, []); //  Run once on load

  const axiosGet = () => {
    axios
      .get(`https://my-german-verb-conjugation-api.herokuapp.com/verbs`)
      .then((data) => setVerbs(data.data));
  };

  if (!verbs) return null; // empty render until we get data

  // Get random object from array of verbs

  const randomObject = verbs[Math.floor(Math.random() * verbs.length)];

  // Get verb to be shown to user for conjugation

  verb = randomObject.verb;

  // Get all the conjugations of the verb to be shown

  const conjugationsOfVerb = randomObject.conjugations;

  // Get a random key of the object conjugationsOfVerb to have a tense to show to user

  const randomKeysConjugations = Object.keys(conjugationsOfVerb);
  tense =
    randomKeysConjugations[
      Math.floor(Math.random() * randomKeysConjugations.length)
    ];

  // Get a pronoum with its corresponding verb form

  for (let conjugation in conjugationsOfVerb) {
    if (conjugation === tense) {
      //Grab a random key value pair to have a pronoum to show to use as well as the correct verb form
      const randomKeyPair = Object.entries(conjugationsOfVerb[tense]);
      const randomKeyValuePair =
        randomKeyPair[Math.floor(Math.random() * randomKeyPair.length)];
      pronoum = randomKeyValuePair[0];
      answer = randomKeyValuePair[1];
    }
  }
  return (
    <section>
      <h1>Conjugate the following verb:</h1>
      <ul>
        <li>Verb: {verb}</li>
        <li>Person: {pronoum}</li>
        <li>Tense: {tense}</li>
      </ul>
    </section>
  );
};

export default Home;
