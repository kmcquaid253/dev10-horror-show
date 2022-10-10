import { useHistory } from "react-router-dom";

function Error({ msg }) {
  const history = useHistory();

  return (
    <p>
      🙅🏾‍♂️ Error{" "}
      {history.location.state ? ` - ${history.location.state.msg}` : ""}
      {msg}
    </p>
  );
}

export default Error;
