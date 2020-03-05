import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyTokenAction } from "../redux/actions/auth";

const TokenVerifyPage: React.FC = props => {
  const history = useHistory();
  const { token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyTokenAction(token!));
    history.push("/teamstyle/intro");
  }, []);

  return <div>VERIFY TOKEN PAGE</div>;
};

export default TokenVerifyPage;
