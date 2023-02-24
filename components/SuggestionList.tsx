import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuggestionList() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<DocumentData>();
  const [suggestions, setSuggestions] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  useEffect(() => {
    const usersRef = collection(db, "users");

    const setFollowers = onSnapshot(usersRef, (snapshot) => {
      const filteredUsers = snapshot.docs.filter(
        (doc) =>
          doc.data().uid !== user?.uid &&
          (!doc.data().followers ||
            !doc.data().followers.includes(user?.displayName))
      );
      const randomSuggestions = filteredUsers
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setSuggestions(randomSuggestions);
    });

    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const filteredUser = snapshot.docs.find(
        (doc) => doc.data().username === user?.displayName
      );
      setCurrentUser(filteredUser);
    });

    return () => {
      setFollowers();
      unsubscribe();
    };
  }, [user]);

  const handleClick = async (id: string) => {
    if (!user) return;
    const userRef = doc(db, "users", id);

    const followingUser = doc(db, "users", currentUser?.id);
    const userSnap = await getDoc(userRef);
    const userCol = userSnap.data();

    const updateFollowing = [
      ...Object.keys(userCol?.following || {}),
      userCol?.username,
    ];
    console.log(updateFollowing);
    const updatedFollowers = [
      ...Object.keys(userCol?.followers || {}),
      user?.displayName || "unknown",
    ];
    await Promise.all([
      updateDoc(userRef, { followers: updatedFollowers }),
      updateDoc(followingUser, { following: updateFollowing }),
    ]);
  };

  return (
    <ul className="space-y-3 mt-3 ">
      {suggestions &&
        suggestions.map((suggestion) => (
          <li key={suggestion.id} className="flex items-center justify-between">
            <Link
              href={suggestion.data().username}
              className="flex items-center"
            >
              <Image
                className="rounded-[100%] mr-2 w-[40px] h-[40px]"
                src={suggestion.data().profilePic}
                alt="suggestion user profile pic"
                width={40}
                height={40}
              />
              <span className="font-regular">{suggestion.data().username}</span>
            </Link>
            <button
              onClick={() => handleClick(suggestion.id)}
              className="follow-btn"
            >
              Follow
            </button>
          </li>
        ))}
    </ul>
  );
}
