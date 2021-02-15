import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import BackgroundQuiz from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Button from '../src/components/Button';


export const QuizContainer = styled.div`
  width:100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
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
          <Widget>
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
          <Widget>
            <Widget.Content>
              <h1>Versículo top</h1>
              <p>Venha a mim</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ritallopes" />
      </BackgroundQuiz>
    </>
  );
}
