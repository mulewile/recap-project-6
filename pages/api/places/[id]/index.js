import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Place Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    // const updatedPlace = request.body;

    await Place.findByIdAndUpdate(id, { $set: request.body });

    response.status(200).json({ status: `Place ${id} successfully updated.` });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }
}

//Old Code

// import { places } from "../../../../lib/db.js";

// export default function handler(request, response) {
//   const { id } = request.query;

//   if (!id) {
//     return;
//   }

//   const place = places.find((place) => place.id === id);

//   if (!place) {
//     return response.status(404).json({ status: "Not found" });
//   }

//   response.status(200).json(place);
// }
