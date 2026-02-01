import { prismaClient } from "db/client"

export default async function Home() {
  const users = await prismaClient.user.findMany();

  return (
    <>
      {JSON.stringify(users)}
    </>
  );
}
