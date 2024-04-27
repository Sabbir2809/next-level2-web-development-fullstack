import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session?.user && (
        <>
          <h1 className="text-4xl text-center mt-10">Welcome To Dashboard {session?.user?.name}</h1>
          <h1 className="text-4xl text-center mt-10">
            Logged-in user Email: {session?.user?.email}
          </h1>
          <Image
            src={
              session?.user?.image ||
              "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
            }
            width={100}
            height={100}
            alt="Avatar"
            className="mx-auto rounded-full mt-5"
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
