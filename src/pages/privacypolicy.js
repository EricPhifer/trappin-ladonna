// eslint-disable-next-line
import { defaultComponents, PortableText } from '@portabletext/react'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Seo from '../components/Seo'
import Layout from '../components/Layout'

const PolicyStyles = styled.div`
  word-wrap: break-word;
  .overlord {
    max-width: 90rem;
    margin: 7rem auto 0;
    background-color: #fff;
    padding: 2rem 2rem 15rem;
    @media only screen and (max-width: 500px) {
      padding: 2rem 2rem 18rem;
    }
  }
  p {
    padding: 0.5rem 0;
  }
  p:first-child {
    padding: 0;
    margin: 0;
  }
  h1 {
    font-size: 5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  .policyContainer {
    max-width: 60rem;
    margin: 0 auto;
    padding: 0 1rem;
  }
  .updateDate {
    text-align: center;
  }
  @media only screen and (max-width: 900px) {
    margin: 0 auto;
  }
  @media only screen and (max-width: 450px) {
    h1 {
      font-size: 3rem;
    }
  }
`

export default function PrivacyPolicy() {
  const { policies } = useStaticQuery(graphql`
    query {
      policies: allSanityPrivacypolicy {
        nodes {
          id
          title
          _rawContent
        }
      }
    }
  `)
  const { nodes } = policies
  return (
    <Layout>
      <Seo title="Privacy Policy" />
      <PolicyStyles>
        <div className="overlord">
          {nodes.map(policy => (
            <section key={policy.id}>
              <h1>{policy.title}</h1>
              <section className="policyContainer">
                <PortableText
                  value={policy._rawContent}
                  components={defaultComponents}
                  className="answer flex"
                />
              </section>
            </section>
          ))}
        </div>
      </PolicyStyles>
    </Layout>
  )
}
