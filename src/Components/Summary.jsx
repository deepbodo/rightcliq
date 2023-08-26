import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { API, graphqlOperation } from "aws-amplify";
import {
  categoryDetailByCategoryID,
  categoryDetailByCategoryName,
  dataByQuerryID,
  projectByProjectID,
  projectByUserID,
  templateByTemplateID,
} from "../graphql/queries";
import {
  createTransactionRazorpay,
  deleteNote,
  updateNote,
} from "../graphql/mutations";
const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  background-color: #f1f1f1;
  flex-direction: column;
`;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const Summary = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [amount, setAmount] = useState();
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const [paymnetId, setPaymentId] = useState();
  const [orderId, setOrderId] = useState();
  const [signature, setSignature] = useState();
  useEffect(() => {
    async function getProject() {
      const result = await API.graphql(
        graphqlOperation(projectByProjectID, {
          id: pId,
        })
      );
      let todo = result?.data?.projectByProjectID?.items;
      if (todo) {
        todo.map((data) => {
          setData(data);
          console.log(data);
        });
      }
    }
    getProject();
  }, []);
  useEffect(() => {
    async function fetchTemplateData() {
      try {
        const result = await API.graphql(
          graphqlOperation(templateByTemplateID, { id: data?.templateId })
        );
        const templateData = result?.data?.templateByTemplateID?.items;
        if (templateData) {
          console.log(templateData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (data?.templateId) {
      fetchTemplateData();
    }
  }, [data]);
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const result = await API.graphql(
          graphqlOperation(categoryDetailByCategoryName, {
            categoryname: data?.category,
          })
        );
        const categoryData = result?.data?.categoryDetailByCategoryName?.items;
        if (categoryData) {
          categoryData.map((data) => {
            setCategory(data);
            setAmount(data.categoryprice);
          });
          console.log(categoryData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (data?.category) {
      fetchCategoryData();
    }
  }, [data]);

  async function displayRazorpay() {
    // event.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const data = await fetch(
      "https://nyye8403t9.execute-api.ap-south-1.amazonaws.com/dev/payment/razorpay/",
      { method: "POST", body: JSON.stringify({ amount }) }
    ).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_Zwqj0pDtOxIsfY",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: "RightCliq",
      description: "Thank you for nothing. Please give us some money",
      // image: 'http://localhost:1337/logo.svg',
      handler: async function (response) {
        if (
          response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature
        ) {
          setPaymentId(response.razorpay_payment_id);
          setOrderId(response.razorpay_order_id);
          setSignature(response.razorpay_signature);
          await CompletePayment();
        } else {
          await deleteProject();
          nav(`/business/${id}/`);
        }
      },
      prefill: {
        name: "rightcliqadmin",
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  async function Click() {
    const data = await fetch(
      "https://v9cuhyxhs3.execute-api.ap-south-1.amazonaws.com/dev/payment/razorpay/",
      { method: "POST" }
    ).then((t) => t.json());
    console.log(data);
  }
  async function CompletePayment() {
    const details = {
      userId: id,
      projectId: pId,
      paymnetId: paymnetId,
      orderId: orderId,
      signature: signature,
      projectname: data.projectname,
    };
    const todo = await API.graphql(
      graphqlOperation(createTransactionRazorpay, {
        input: details,
      })
    );
    if (todo) {
      await updateProject();
      nav(`/7bnmsasabjkhaknsjsja/`);
    }
  }
  async function updateProject() {
    const details = {
      id: pId,
      price: amount,
    };
    await API.graphql(
      graphqlOperation(updateNote, {
        input: details,
      })
    );
  }
  async function deleteProject() {
    const deletedata = {
      id: pId,
    };
    await API.graphql(
      graphqlOperation(deleteNote, {
        input: deletedata,
      })
    );
  }
  return (
    <>
      {/* {showLoader ? (
        <ContainerCenter>
          {" "}
          <HashLoader size={50} color="#00e6e6" />
        </ContainerCenter>
      ) : ( */}
      <Container>
        <H>Review Your Orders</H>
        <Div>
          <H2>ORDER SUMMARY</H2>
          <H2>QUANTITY</H2>
          <H2>ITEM TOTAL</H2>
        </Div>
        <Line />
        <Div>
          <Left>
            <H22>ORDER SUMMARY</H22>
            <H22>TOTAL TAX & CHARGES</H22>
            <H22>TOATAL PAYMENT</H22>
          </Left>
          <Middle>
            <H22>1</H22>
            <H22>₹{category.categoryprice}</H22>
            <H22>₹{category.categoryprice}</H22>
          </Middle>
          <Right>
            {" "}
            <H23>1</H23>
            <H23>₹{category.categoryprice}</H23>
            <H23>₹{amount}</H23>
          </Right>
        </Div>
        <H>Billing Information</H>
        <Div>
          <Left></Left>
        </Div>
        <button onClick={displayRazorpay}>PAY</button>
        {/* <Button to="/7bnmsasabjkhaknsjsja/">MAKE PAYMENT</Button> */}
      </Container>
      {/* )} */}
    </>
  );
};

export default Summary;
const Left = styled.div`
  width: 400px;
  display: flex;
  height: 230px;
  flex-direction: column;
  text-align: left;
  padding: 8px;
`;
const Middle = styled.div`
  width: 500px;
  display: flex;
  height: 230px;
  flex-direction: column;
  text-align: center;
  padding: 8px;
`;
const Right = styled.div`
  width: 300px;
  display: flex;
  height: 230px;
  flex-direction: column;
  text-align: center;
  padding: 8px;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  letter-spacing: 2px;
  margin-top: 30px;
  margin-left: 40px;
  margin-bottom: -30px;
`;
const Div = styled.div`
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;
const Div3 = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  text-align: center;
  align-items: center;
`;
const H2 = styled.h3`
  color: #292929;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 1px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: -20px;
`;
const H22 = styled.h3`
  color: #292929;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 1.6px;
`;
const H23 = styled.h3`
  color: #292929;
  font-weight: 600;
  font-size: 1.2rem;
  margin-left: 100px;
  letter-spacing: 1.6px;
`;
const H3 = styled.h3`
  color: #292929;
  font-weight: 500;
  font-size: 1.9rem;
  text-align: center;
  letter-spacing: 2px;
  margin-right: 180px;
  margin-bottom: -20px;
`;
const Line = styled.div`
  width: 100%;
  margin-top: 40px;
  height: 4px;
  background-color: #646464;
`;

const Button = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: auto;
  padding: 8px;
  align-items: center;
  text-decoartion: none;
  display: flex;
  justify-content: center;
  background-color: #e88485;
  font-size: 1.2rem;
  border: none;
  text-decoration: none;
  font-weight: 500;
  margin: auto;
  border-radius: 15px;
  pointer: cursor;
  &:hover {
    background-color: #e88485;
    color: #000;
  }
`;

// import React, { useState } from "react";
// import "./App.css";
// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }
// const Button = () => {
//   const [amount, setAmount] = useState();
//   async function displayRazorpay(event) {
//     event.preventDefault();
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }
//     const data = await fetch(
//       "https://v9cuhyxhs3.execute-api.ap-south-1.amazonaws.com/dev/payment/razorpay/",
//       { method: "POST", body: JSON.stringify({ amount }) }
//     ).then((t) => t.json());

//     console.log(data);

//     const options = {
//       key: "rzp_test_Zwqj0pDtOxIsfY",
//       currency: data.currency,
//       amount: data.amount,
//       order_id: data.id,
//       name: "Donation",
//       description: "Thank you for nothing. Please give us some money",
//       // image: 'http://localhost:1337/logo.svg',
//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature);
//       },
//       prefill: {
//         name: "deep",
//         email: "sdfdsjfh2@ndsfdf.com",
//         phone_number: "9899999999",
//       },
//     };
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   }
//   async function Click() {
//     const data = await fetch(
//       "https://v9cuhyxhs3.execute-api.ap-south-1.amazonaws.com/dev/payment/razorpay/",
//       { method: "POST" }
//     ).then((t) => t.json());
//     console.log(data);
//   }
//   return (
//     <div>
//       <form onSubmit={displayRazorpay}>
//         <label htmlFor="amount">Amount:</label>
//         <input
//           type="number"
//           id="amount"
//           name="amount"
//           value={amount}
//           onChange={(event) => setAmount(event.target.value)}
//           required
//         />
//         <button type="submit">Pay</button>
//       </form>
//     </div>
//   );
// };

// export default Button;
