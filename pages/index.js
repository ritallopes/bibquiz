import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import BackgroundQuiz from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import db from '../db.json'

export const QuizContainer = styled.div`
  width:100%;
  max-width: 350px;
  padding-top: 25px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;
export async function getServerSideProps(context) {
  const res = await fetch(`https://www.abibliadigital.com.br/api/verses/nvi/sl/random`);
  console.log(db.external)

  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      verse:data,
    },
  }
}


export default function Home({verse}) {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <>
      <Head>
        <title>BibQuiz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BackgroundQuiz>
        <QuizContainer>
          <Widget 
          as={motion.section}
          transition={{delay:0, duration:0.5}}  
          variants={{
            show: {opacity:1, y:'0'},
            hidden: {opacity: 0, y:'100%'},
            }}
            initial='hidden'
            animate='show'>
            <Widget.Header><h1>Quiz - Quem sou eu? -</h1></Widget.Header>
            <Widget.Content>
              <form onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}>
                <Input
                  name="nomeDoUsuário"
                  onChange={(infosDoEvento) => { setName(infosDoEvento.target.value)}}
                  placeholder="Quem é você?"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
          as={motion.section}
          transition={{delay:0.5, duration:0.5}} 
          variants={{
            show: {opacity:1},
            hidden: {opacity: 0},
            }}
            initial='hidden'
            animate='show'
            >
            <Widget.Content>
              <h1>Versos para hoje e para depois também</h1>
              <ul>
                <li>{ verse &&
                  <Widget.Topic 
                     as = {Link}
                     href={`https://www.bibliaonline.com.br/nvi/${verse.book.abbrev.pt}/${verse.chapter}`}
                  >
                    {verse.text}
                  </Widget.Topic>
                }
                </li>
              </ul>
            </Widget.Content>
          </Widget>
          <Footer 
          as={motion.section}
          transition={{delay:1, duration:0.5}} 
          variants={{
            show: {opacity:1},
            hidden: {opacity: 0},
            }}
            initial='hidden'
            animate='show'/>
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ritallopes" />
      </BackgroundQuiz>
    </>
  );
}
