import Shopping from "./Shopping";


export const getStaticPaths = async () => {
  const paths = Array.from({ length: 5 }, (_, index) => ({
    params: {
      id: (index + 1).toString(),
    },
  }));

  return {
    paths,
    fallback: true, // false or "blocking"
  };
};

async function getAllData() {
  const username = 'jessybandya';
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();
  return data;
}

export default async function Repos({ params }) {
  const allData = await getAllData();
  const modifiedData = allData.map(repo => ({
    ...repo,
    name: repo.name.replace(/[-_]/g, ' ')
  }));
  return (
    <Shopping allData={modifiedData} params={params} />
  );
}
