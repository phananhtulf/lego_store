import { Spinner } from "react-bootstrap";

const Loading = (props) => {
  return (
    <>
      {props.isLoading && (
        <div className="centered">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {props.httpError && <p className="centered">{props.httpError}</p>}
    </>
  );
};

export default Loading;
