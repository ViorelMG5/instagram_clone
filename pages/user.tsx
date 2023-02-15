import useAuth from "@/hooks/useAuth";

export default function user() {
  const { user } = useAuth();

  console.log(user);

  return <div>user</div>;
}
