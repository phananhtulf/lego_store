import { Card } from "react-bootstrap";

const StartingPageContent = () => {
  return (
    <Card className="text-center" style={{ margin: "2rem" }}>
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> E-commerce MOCK project </p>
          <footer className="blockquote-footer">
            Coding by <cite title="Source Title">TuPA2</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default StartingPageContent;
