import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [studentAnswer, setStudentAnswer] = useState('');
  const [verbs, setVerbs] = useState(null);
  const [verb, setVerb] = useState('essen');
  const [tense, setTense] = useState('präsens');
  const [pronoum, setPronoum] = useState('wir');
  const [answer, setAnswer] = useState('essen');

  useEffect(() => {
    axiosGet();
  }, []); //  Run once on load

  const axiosGet = () => {
    axios
      .get(`https://my-german-verb-conjugation-api.herokuapp.com/verbs`)
      .then((data) => setVerbs(data.data));
  };

  if (!verbs) return null; // empty render until we get data

  const checkAnswer = (event) => {
    event.preventDefault();

    if (answer === studentAnswer) {
      console.log('👌 correct');
    } else {
      console.log('❌ incorrect');
    }
    setStudentAnswer('');
  };

  const changeVerb = (verbs) => {
    // Get random object from array of verbs
    const randomObject = verbs[Math.floor(Math.random() * verbs.length)];

    // Get verb to be shown to user for conjugation
    setVerb(randomObject.verb);

    // Get all the conjugations of the verb to be shown
    const conjugationsOfVerb = randomObject.conjugations;
    // Get a random key of the object conjugationsOfVerb to have a tense to show to user

    const randomKeysConjugations = Object.keys(conjugationsOfVerb);
    setTense(
      randomKeysConjugations[
        Math.floor(Math.random() * randomKeysConjugations.length)
      ]
    );

    // Get a pronoum with its corresponding verb form

    for (let conjugation in conjugationsOfVerb) {
      if (conjugation === tense) {
        //Grab a random key value pair to have a pronoum to show to use as well as the correct verb form
        const randomKeyPair = Object.entries(conjugationsOfVerb[tense]);
        const randomKeyValuePair =
          randomKeyPair[Math.floor(Math.random() * randomKeyPair.length)];

        setPronoum(randomKeyValuePair[0]);
        setAnswer(randomKeyValuePair[1]);
      }
    }
  };

  return (
    <section>
      <h1>Conjugate the following verb:</h1>
      <ul>
        <li>Verb: {verb}</li>
        <li>Person: {pronoum}</li>
        <li>Tense: {tense}</li>
      </ul>
      <form action="">
        <label>
          Conjugation:
          <input
            value={studentAnswer}
            onChange={(event) => setStudentAnswer(event.target.value)}
            type="text"
            name="conjugation"
            placeholder="Write your answer here"
          />
        </label>

        <button
          type="submitt"
          onClick={(event) => {
            checkAnswer(event);
            changeVerb(verbs);
          }}
        >
          CHECK
        </button>
      </form>
    </section>
  );
};

export default Home;
