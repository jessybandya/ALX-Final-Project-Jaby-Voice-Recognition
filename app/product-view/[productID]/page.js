import React from "react";
import Repo from "./Repo";

export const getStaticPaths = async () => {
  const data = await getAllData();

  const paths = data.map((product) => ({
    params: {
      productID: product.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

async function getAllData() {
  const username = "jessybandya";
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();
  return data;
}

async function getRepoData(repoID) {
  const response = await fetch(`https://api.github.com/repositories/${repoID}`);
  const product = await response.json();
  return product;
}

export default async function ProductView({ params }) {
  const allData = await getRepoData(params.productID);
  return <Repo allData={allData} />;
}