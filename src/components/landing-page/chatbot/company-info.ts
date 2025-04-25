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
    keywords: ["renew plate", "plate renewal", "renew my number"],
    answer:
      "To renew your plate number, go to the Renewal section, input your vehicle and payment details, and follow the instructions.",
  },
  {
    keywords: ["verify vehicle", "vehicle verification"],
    answer:
      "You can verify your vehicle by entering your plate number in the verification section of the portal.",
  },
];
