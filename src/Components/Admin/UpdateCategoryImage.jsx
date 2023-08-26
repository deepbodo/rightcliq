import React, { useState } from "react";
import { Button as button } from "react-bootstrap";
import { Storage, API } from "aws-amplify";
import styled from "styled-components";

const UpdateCategoryImage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Upload the file to the CategoryImage folder in S3 using the Amplify Storage module
    try {
      const result = await Storage.put(`CategoryImage/${file.name}`, file, {
        contentType: file.type,
      });
      console.log(result);
      setFilePath(result.key);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      <Form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button variant="primary" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        {filePath && <P>Uploaded</P>}
      </Form>
    </>
  );
};

export default UpdateCategoryImage;

const Form = styled.form`
  display: flex;
  align-items: center;
`;
const P = styled.p`
  color: #007acc;
  font-weight: 600;
  margin-left: 5px;
`;
