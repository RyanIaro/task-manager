import Head from "next/head";
import { useRouter } from "next/router";

interface Props{
  serverTime: string;
}

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  return server.getTime() - client.getTime();
};


export default function Home({serverTime}: Props){
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{""}
            <span className="serverTime">{serverTime}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{""}
            <span className="serverTime">{/* Replace with the value */}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

//Fetches the server time
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/server-time');
  const { serverTime } = await response.json();

  return {
    props: {
      serverTime,
    },
  };
}