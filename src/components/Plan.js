import { PortableText, defaultComponents } from '@portabletext/react'
import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import Cta from './Cta'

const Section = styled.section`
  height: 100%;
  position: relative;
  z-index: 0;
  img {
    position: absolute;
    @media only screen and (max-height: 400px) {
      top: -5rem;
    }
  }

  // Landscape view
  @media only screen and (max-height: 600px) {
    height: calc(100% + 10rem);
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  .cta {
    justify-self: end;
    align-self: end;
  }
  // Mobile view
  @media only screen and (max-width: 750px) {
    height: 90%;
  }
  @media only screen and (max-height: 500px) {
    height: calc(100% - 15rem);
  }
`

const Title = styled.h3`
  margin: 3rem 0;
  font-size: 5rem;
  text-shadow: 0.1rem 0 0 var(--gray), -0.1rem 0 0 var(--gray),
    0 0.1rem 0 var(--gray), 0 -0.1rem 0 var(--gray);
  @media only screen and (max-width: 900px) {
    font-size: 3.5rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 2rem;
  }
`

const Step = styled.div`
  margin: 2rem;
  display: inline-flex;
  align-items: center;
  @media only screen and (max-width: 625px) {
    margin-left: 0 !important;
  }
  @media only screen and (max-width: 500px) {
    margin: 2rem 0;
  }
`

const StepNum = styled.p`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.7rem solid var(--blue);
  border-radius: 50%;
  padding: 1.5rem;
  font-size: 2.4rem;
`

const StepWords = styled.div`
  font-size: 2.4rem;

  @media only screen and (max-width: 500px) {
    font-size: 2rem;
  }
`

export default function Plan() {
  const { plan } = useStaticQuery(graphql`
    query {
      plan: allSanityPlan {
        nodes {
          id
          title
          stepofplan {
            _key
            stepnumber
            _rawContent
          }
        }
      }
    }
  `)
  const { nodes } = plan
  return (
    <>
      {nodes.map(node => (
        <Section key={node.id}>
          <Title>How Does It Work?</Title>
          <Container>
            {node.stepofplan
              .map(step => (
                <Step
                  style={{ marginLeft: `calc(5rem * ${step.stepnumber})` }}
                  key={step._key}
                >
                  <StepNum>{step.stepnumber}</StepNum>
                  <StepWords>
                    <PortableText
                      value={step._rawContent}
                      components={defaultComponents}
                    />
                  </StepWords>
                </Step>
              ))
              .sort()}
            <Cta />
          </Container>
        </Section>
      ))}
    </>
  )
}
