import React, {
  Component,
  useEffect,
  useState,
  CSSProperties,
  onChange,
} from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { graphqlOperation } from "aws-amplify";
import {
  listCategories,
  projectByUserID,
  templateByCategoryID,
} from "../graphql/queries";
import { v4 as uuid } from "uuid";
import { Storage, API } from "aws-amplify";
import { createCategories, createTemplate } from "../graphql/mutations";
import { AuthContext, AuthProvider } from "./AuthContext";
import Admin from "./Admin";
import AdminDashboard from "./Admin/AdminLog";

const Image = styled.img`
  width: 250px;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Test = () => {
  const nav = useNavigate();
  const [tennant, setTenant] = useState(false);
  async function fetchTenant() {
    try {
      const { accessToken } = await Auth.currentSession();
      const cognitogroups = accessToken.payload["cognito:groups"];
      const tenant = cognitogroups[0];
      if (tenant == "Admin") {
        setTenant(true);
      }
    } catch (err) {
      console.log(err);
      nav("/admin/login/");
    }
  }
  function navigation() {
    nav("/admin/login/");
  }

  useEffect(() => {
    fetchTenant();
  }, []);
  if (tennant) {
    return <>{tennant ? <div>ukfvjhf</div> : <div>not admin</div>}</>;
  }
};

export default Test;
