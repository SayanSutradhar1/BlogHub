"use client"

import React from "react";
import { ApiProvider as Provider } from "@reduxjs/toolkit/query/react";
import blogApi from "@/services/blog.service";

interface Props {
  children: React.ReactNode;
}

const BlogApiProvider: React.FC<Props> = ({ children }) => {
  return <Provider api={blogApi}>{children}</Provider>;
};

export {
  BlogApiProvider
}