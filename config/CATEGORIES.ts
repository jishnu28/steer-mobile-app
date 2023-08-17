import ACCOMODATION from "./ACCOMODATION";
import EXPERIENCES from "./EXPERIENCES";

export default [
  {
    id: 1,
    title: "Accomodation",
    dbName: "accommodations",
    items: [...ACCOMODATION],
  },
  {
    id: 2,
    title: "Experiences",
    dbName: "experiences",
    items: [...EXPERIENCES],
  },
];