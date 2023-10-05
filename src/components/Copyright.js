import { Link, graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

const CopyStyles = styled.footer`
  width: 100%;
  height: 12rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  background-color: var(--black);
  font-weight: 600;
  color: white;
  p {
    padding: 0.25rem 2rem;
  }
  a {
    color: lightsteelblue;
    &:hover {
      color: steelblue;
    }
  }
  @media only screen and (max-width: 330px) {
    height: 15rem;
  }
`

const List = styled.ul`
  list-style-type: none;
  display: inline-flex;
  &:first-child:after {
    content: ' | ';
  }
`

const Item = styled.li`
  padding: 0.5rem;
`

const Anchor = styled(Link)`
  color: var(--white);
  &:hover {
    color: var(--red);
  }
`

export default function Copyright() {
  const { foot } = useStaticQuery(graphql`
    query {
      foot: allSanityFooter {
        nodes {
          id
          title
          dev
          devlink
          links {
            _key
            pagename
            pagelink
          }
        }
      }
    }
  `)
  const { nodes } = foot

  return (
    <>
      {nodes.map(node => (
        <CopyStyles className="storybrand" key={node.id}>
          <p>
            &copy; {new Date().getFullYear()} All Rights Reserved {node.title}
          </p>
          <p>
            Built by{' '}
            <a href={node.devlink} rel="noopener noreferrer" target="__blank">
              {node.dev}
            </a>
          </p>
          <List>
            {node.links.map(link => (
              <Item key={link._key}>
                <Anchor to={link.pagelink}>{link.pagename}</Anchor>
              </Item>
            ))}
          </List>
        </CopyStyles>
      ))}
    </>
  )
}
