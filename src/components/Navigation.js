import { Link, graphql, useStaticQuery } from 'gatsby'
// eslint-disable-next-line
import SanityImage from 'gatsby-plugin-sanity-image'
import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 7rem;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--white);
  z-index: 1001;
`

const Nav = styled.nav`
  width: 100vw;
  height: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  .contact {
    width: 45%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.25rem;
    color: var(--white);
    padding: 2rem;
    background: var(--blue);
    transition: all 0.3s ease-in-out;
    &:hover {
      background: var(--white);
      color: var(--blue);
    }
    &:focus {
      background: var(--white);
      color: var(--blue);
    }
  }
  @media only screen and (max-width: 815px) {
    display: none;
  }
`

const Img = styled(Link)`
  min-width: 12rem;
  height: 100%;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  img {
    height: 90%;
  }
  @media only screen and (max-width: 815px) {
    width: 7rem;
  }
`

const List = styled.ul`
  width: 75%;
  height: 100%;
  list-style-type: none;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
`

const Item = styled.li`
  a {
    text-decoration: none;
    font-size: 2rem;
    color: var(--black);
    transition: all 0.3s ease-in-out;
    &:hover {
      color: var(--blue);
    }
    &:focus {
      color: var(--blue);
    }
  }
`

// Mobile Styling & Responsive Design
const Mobile = styled.div`
  display: none;
  @media only screen and (max-width: 815px) {
    display: block;
  }
`

const MenuToggle = styled.label`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 2rem;
  right: 2.5rem;
  z-index: 102;
  -webkit-user-select: none;
  user-select: none;
  span {
    display: flex;
    position: relative;
    width: 5rem;
    height: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.3rem;
    box-shadow: 0.3rem 0.3rem 0.5rem var(--black);
    z-index: 102;
    transform-origin: 0.5rem 0;
    background: var(--white);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }
  span:first-child {
    transform-origin: 0% 0%;
  }
  span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
  input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-1rem, 0);
    box-shadow: none;
  }
  input:checked ~ span:nth-last-child(2) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  input:checked ~ span:nth-last-child(3) {
    transform: rotate(-45deg) translate(-1.65rem, 0);
  }
  input:checked ~ #menu {
    transform: none;
  }
`

const MenuInput = styled.input`
  display: flex;
  width: 5rem;
  height: 3.2rem;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  z-index: 103;
  bottom: 0;
  right: 0;
`

const MenuContainer = styled.div`
  width: 50%;
  height: 100%;
  margin: 0;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--blue);
  box-shadow: 0 0 1rem #85888c;
  transform-origin: 0% 0%;
  transform: translate(100%, 0%);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  overflow-y: auto;
  overflow-x: hidden;
  @media only screen and (max-width: 600px) {
    width: 75%;
  }
  li {
    transition-delay: 2s;
  }
`

const MobileNav = styled.nav`
  width: 50vw;
  height: 100%;
  background-color: var(--black);
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const Contact = styled(Link)`
  bottom: 0;
  font-size: 2rem;
  color: var(--white);
  width: 100%;
  padding: 2rem;
  text-align: center;
  background: var(--blue);
  transition: all 0.3s ease-in-out;
  &:hover {
    background: var(--white);
    color: var(--blue);
  }
  &:focus {
    background: var(--white);
    color: var(--blue);
  }
  @media only screen and (max-width: 815px) {
    position: absolute;
  }
`

const MobileList = styled.ul`
  width: 100%
  height: 100%;
  list-style-type: none;
  max-width: 75%;
  display: flex;
  flex-flow: column wrap;
  margin: 20% auto 0;
  padding: 0;
`

const MobileItem = styled.li`
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: var(--white);
  a {
    font-size: 2rem;
    color: var(--white);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      border-bottom: var(--white);
    }
    &[aria-current='page'] {
      border-bottom: var(--white);
    }
  }
  @media only screen and (max-width: 325px) {
    a {
      font-size: 1.8rem;
    }
  }
`

export default function Navigation() {
  const { navigation } = useStaticQuery(graphql`
    query {
      navigation: allSanityNavigation {
        nodes {
          id
          alt
          title
          source
          primelink
          primetitle
          logo {
            asset {
              id
            }
            ...ImageWithPreview
          }
          navlinks {
            _key
            pagelink
            pagename
          }
        }
      }
    }
  `)
  const { nodes } = navigation
  const [checked, setChecked] = useState(false || '')
  return (
    <>
      {nodes.map(node => (
        <Container key={node.id}>
          <Nav>
            <Img to="/#top">
              {node.logo ? (
                <SanityImage
                  {...node.logo}
                  alt={node.alt}
                  styles={{
                    width: `7rem`,
                    objectFit: 'contain',
                    auto: 'format',
                  }}
                />
              ) : (
                <div />
              )}
            </Img>
            <List>
              {node.navlinks.map(page => (
                <Item key={page._key}>
                  <Link to={page.pagelink}>{page.pagename}</Link>
                </Item>
              ))}
            </List>
            <Contact to={node.primelink} className="contact">
              {node.primetitle}
            </Contact>
          </Nav>
          <Mobile>
            <Img to="/#top">
              {node.logo ? (
                <SanityImage
                  {...node.logo}
                  alt={node.alt}
                  styles={{
                    objectFit: 'contain',
                    auto: 'format',
                  }}
                />
              ) : (
                <div />
              )}
            </Img>
            <MenuToggle htmlFor="hamburger-menu">
              <MenuInput
                type="checkbox"
                id="hamburger-menu"
                checked={checked}
                onClick={() => {
                  setChecked(old => !old)
                }}
              />
              <span />
              <span />
              <span />
              <MenuContainer id="menu">
                <MobileNav>
                  <MobileList>
                    {node.navlinks.map(pagelink => (
                      <MobileItem key={pagelink._key}>
                        <Link to={pagelink.pagelink}>{pagelink.pagename}</Link>
                      </MobileItem>
                    ))}
                  </MobileList>
                  <Contact to={node.primelink} className="contact">
                    {node.primetitle}
                  </Contact>
                </MobileNav>
              </MenuContainer>
            </MenuToggle>
          </Mobile>
        </Container>
      ))}
    </>
  )
}
