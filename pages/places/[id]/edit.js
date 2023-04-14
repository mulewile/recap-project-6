import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();

  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    const response = await fetch(id ? `/api/places/${id}` : null, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });
    router.push(`/places/${id}`);
    if (!response.ok) {
      console.error(`Error: ${response.status}`);
    }

    console.log("Place edited (but not really...");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}

/*I would like go to the details page after updating, how do I refactor this => router.push("/");
What is happening here => id ? `/api/places/${id}` : null*/
