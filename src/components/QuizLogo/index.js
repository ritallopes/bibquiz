import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';

function Logo({ className }) {
  return (
    <Image src="/android-chrome-192x192.png"
    alt="Quiz Quem sou eu"
    width={70}
    height={70}/>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  display: block;
  margin:auto;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  text-align:center;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;