import React, { useEffect, useState, CSSProperties, onChange } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { graphqlOperation } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import Modal from "./Category/Modal";
import { Storage, API } from "aws-amplify";
import { templateByTemplateID } from "../graphql/queries";
import { AiOutlineRollback } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Container = styled.div`
  background-color: #87919a;
  display: flex;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Div = styled.div`
  height: auto;
  width: 100%;
  padding: 40px;
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 1000px;
  border-radius: 25px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;
const Image = styled.img`
  height: 50%;
  width: 80%;
  filter: drop-shadow(5px 5px 5px #87919a);
`;
const Bar = styled.div`
  height: 30px;
  width: 100%;
  margin: 15px;
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const P = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 10px;
  z-index: 1;
  height: 28px;
  font-size: 1rem;
  text-align: left;
`;
const Div2 = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const Price = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 10px;
  z-index: 1;
  height: 28px;
  color: #c677fc;
  font-size: 1.3rem;
  text-align: left;
`;
const TemplateDetail = () => {
  const { id, categoryId, name, tempname } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [isOpen, setIsOpen] = useState(true);
  console.log(id, categoryId, name, tempname);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const todoData = await API.graphql(
        graphqlOperation(templateByTemplateID, {
          templateId: `${tempname}`,
        })
      );
      let todos = todoData.data.templateByTemplateID.items;
      todos = await Promise.all(
        todos.map(async (todo) => {
          const imageKey = await Storage.get(todo.image1);
          todo.image = imageKey;
          return todo;
        })
      );
      console.log(todos);
      setPosts(todos);
      setLoading(false);
      console.log(posts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  return (
    <>
      {showLoader ? (
        <ContainerCenter>
          {" "}
          <GridLoader size={10} color="#00e6e6" />
        </ContainerCenter>
      ) : (
        <Container>
          {posts.map((item) => (
            <Div>
              <Bar>
                <AiOutlineRollback size="30" />
                <NavLink to={`/business/${id}/templates/${categoryId}/${name}`}>
                  {" "}
                  <P>Back</P>
                </NavLink>
              </Bar>
              <Div2>
                {" "}
                <P>
                  {item.templatename}...<Price>₹{item.templateprice}</Price>
                </P>
                {isCopied ? (
                  <Price className="success-msg">
                    Code copied successfully!
                  </Price>
                ) : (
                  <CopyToClipboard
                    text={item.templateId}
                    onCopy={() => {
                      setIsCopied(true);
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 1000);
                    }}
                  >
                    <Button className="btn">
                      Copy code for use!
                      <MdContentCopy />
                    </Button>
                  </CopyToClipboard>
                )}
              </Div2>
              <Description>
                <P>{item.templatedetail}</P>
              </Description>
              <Image src={item.image} />
            </Div>
          ))}
        </Container>
      )}
    </>
  );
};

export default TemplateDetail;

const Button = styled.button`
  border: none;
  align-items: center;
  text-align: center;
  display: flex;
  padding: 2px;
  font-size: 1.2rem;
  justify-content: center;
  width: 200px;
  border-radius: 10px;
`;
const Description = styled.div`
  text-align: justify;
  width: 80%;
  margin-bottom: 30px;
`;
