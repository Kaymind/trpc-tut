import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function PostPage() {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, error, isLoading } = trpc.useQuery([
    "posts.post",
    {
      postId,
    },
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}

export default PostPage;
