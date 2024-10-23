import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  comments: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName, 
  email,
  queryType, 
  comments,
}) => (
  <div>
    <h1>{queryType}</h1>
    <h2>Query Details: {comments}</h2>
    <h3>From: {email} {firstName} {lastName}</h3>
  </div>
);