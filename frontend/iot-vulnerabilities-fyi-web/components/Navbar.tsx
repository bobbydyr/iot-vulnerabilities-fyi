import React from "react";
import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";

export default function NavBar() {
  const [variant, setVariant] = React.useState("static");

  const variants = ["static", "floating", "sticky"];

  return (
    <>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <Text b color="inherit">
            iot vulnerabilities fyi
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link href="/">Products</Navbar.Link>
          <Navbar.Link href="/company">Companies</Navbar.Link>
          {/* <Navbar.Link href="/vulnerabilities">Vulnerabilities</Navbar.Link> */}
        </Navbar.Content>
        <Navbar.Content hideIn={'xs'}>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}
