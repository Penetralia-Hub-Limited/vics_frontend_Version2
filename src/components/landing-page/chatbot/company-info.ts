interface CustomResponse {
  keywords: string[]; // partial phrases to match
  answer: string;
}

export const customResponses: CustomResponse[] = [
  {
    keywords: ["what is vics", "about vics", "explain vics"],
    answer:
      "VICS stands for Vehicle Identification and Certification System. It helps manage plate numbers, verifications, and more.",
  },
  {
    keywords: [
      "renew plate",
      "plate renewal",
      "renew my plate number",
      "renew my plate",
    ],
    answer:
      "To renew your plate number, visit the KWARA state Motor Licensing Authority Office at  27, Ahmadu Bello Way, GRA, Ilorin, Kwara State. No 3, Fate Road, Near Fate Roundabout, Ilorin, Kwara State.",
  },
  {
    keywords: ["verify vehicle", "vehicle verification"],
    answer:
      "You can verify your vehicle by entering your plate number in the verification section of the portal.",
  },
  {
    keywords: [
      "where can I renew my plate number",
      "location",
      "where can I go to",
      "looking for where to renew my plate",
    ],
    answer:
      "You can visit the KWARA state Motor Licensing Authority Office at  27, Ahmadu Bello Way, GRA, Ilorin, Kwara State. No 3, Fate Road, Near Fate Roundabout, Ilorin, Kwara State",
  },
];
