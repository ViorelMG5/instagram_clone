import { db } from "@/firebase";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function usePost(uid: string | undefined) {
  const [posts, setPosts] = useState<DocumentData>([]);

  // if (!user) return;
  // setLoading(true);
  // const fileRef = ref(storage, user?.uid + ".webp");
  // const snapshot = await uploadBytes(fileRef, file);
  // const photoURL = await getDownloadURL(fileRef);
  // updateProfile(user, { photoURL });
  // setLoading(false);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(collection(db, "users", uid, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [db, uid]);

  return posts;
}
