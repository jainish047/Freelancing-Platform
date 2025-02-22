import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Text } from "@shadcn/ui";

export default function UserCard({
  name,
  username,
  bio,
  avatarUrl,
  profileLink,
}) {
  return (
    // <Card className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-200">
    //   {/* Avatar and User Info */}
    //   <div className="flex items-center space-x-4">
    //     <Avatar src={avatarUrl} alt={name} className="w-16 h-16 rounded-full" />
    //     <div>
    //       <Text as="h3" className="text-xl font-semibold">{name}</Text>
    //       <Text className="text-sm text-gray-500">@{username}</Text>
    //     </div>
    //   </div>

    //   {/* Bio Section */}
    //   <Text className="mt-2 text-sm text-gray-600">{bio}</Text>

    //   {/* Action Button */}
    //   <Button
    //     asChild
    //     className="mt-4 w-full"
    //   >
    //     <a href={profileLink} target="_blank" rel="noopener noreferrer" className="text-center">View Profile</a>
    //   </Button>
    // </Card>
    <Card className="max-w-sm p-4 shadow-lg rounded-lg">
      {/* Card Header - Profile Picture and Name */}
      <CardHeader className="flex items-center space-x-4">
        <img
          src={""}
          alt={`${name}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <CardTitle className="text-xl font-semibold text-gray-900">
          {name}
        </CardTitle>
      </CardHeader>

      {/* Card Content - Bio */}
      <CardContent>
        <CardDescription className="text-sm text-gray-700">
          {bio}
        </CardDescription>
      </CardContent>

      {/* Card Footer - Follow Button */}
      <CardFooter>
        <button
          //   onClick={onFollow}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Follow
        </button>
      </CardFooter>
    </Card>
  );
}
