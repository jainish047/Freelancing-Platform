import UserCard from "../components/UserCard";
import { Helmet } from "react-helmet-async";

export default function Explore() {
  return (
    <>
      <Helmet>
        <title>Explore</title>
      </Helmet>
      <div className="flex flex-wrap gap-4 p-8">
        <UserCard
          name="Jane Doe"
          bio="Software Engineer passionate about open-source and technology."
          profilePicUrl="https://randomuser.me/api/portraits/women/44.jpg"
          // onFollow={handleFollow}
        />
        <UserCard
          name="John Smith"
          bio="Full-stack developer who loves building scalable applications."
          profilePicUrl="https://randomuser.me/api/portraits/men/44.jpg"
          // onFollow={handleFollow}
        />
      </div>
    </>
  );
}
