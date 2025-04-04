import { Html, Head, Body, Container, Section, Heading, Text } from "@react-email/components";

const EmailTemplate = ({ subject, message, email }) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f6f6", padding: "20px" }}>
      <Container style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
        <Heading style={{ color: "#333333" }}>{subject}</Heading>
        <Text style={{ color: "#555555" }}>Thank you for contacting us!</Text>
        <Text style={{ color: "#555555" }}>New message submitted:</Text>
        <Text style={{ color: "#555555", marginBottom: "20px" }}>{message}</Text>
        <Text style={{ color: "#555555" }}>From: {email}</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;